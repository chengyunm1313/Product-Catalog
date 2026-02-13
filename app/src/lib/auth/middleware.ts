/**
 * RBAC 中介層
 * 驗證使用者身份與角色權限
 */

import { adminAuth } from '@/lib/firebase/admin';
import { type NextRequest, NextResponse } from 'next/server';
import type { UserRole } from '@/types';

/** 從 Request Header 取得 Token */
function getTokenFromRequest(request: NextRequest): string | null {
	const authorization = request.headers.get('Authorization');
	if (authorization?.startsWith('Bearer ')) {
		return authorization.slice(7);
	}
	return null;
}

/** 驗證使用者身份 */
export async function verifyAuth(request: NextRequest) {
	const token = getTokenFromRequest(request);
	if (!token) {
		return { user: null, error: '未提供驗證 Token' };
	}

	try {
		const decodedToken = await adminAuth.verifyIdToken(token);
		return {
			user: {
				uid: decodedToken.uid,
				email: decodedToken.email || '',
				role: (decodedToken.role as UserRole) || 'viewer',
			},
			error: null,
		};
	} catch {
		return { user: null, error: '無效的驗證 Token' };
	}
}

/** 檢查角色權限 */
export function checkRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
	return requiredRoles.includes(userRole);
}

/** 需要認證的 API 包裝 */
export async function withAuth(
	request: NextRequest,
	requiredRoles: UserRole[],
	handler: (uid: string, role: UserRole) => Promise<NextResponse>
): Promise<NextResponse> {
	const { user, error } = await verifyAuth(request);

	if (!user || error) {
		return NextResponse.json({ success: false, error: error || '未認證' }, { status: 401 });
	}

	if (!checkRole(user.role, requiredRoles)) {
		return NextResponse.json({ success: false, error: '權限不足' }, { status: 403 });
	}

	return handler(user.uid, user.role);
}
