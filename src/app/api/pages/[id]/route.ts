/**
 * 單頁面 API 路由
 * GET / PUT / DELETE
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPageById, updatePage, deletePage } from '@/lib/firestore/pages';

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const page = await getPageById(id);

		if (!page) {
			return NextResponse.json({ success: false, error: '找不到該頁面' }, { status: 404 });
		}

		return NextResponse.json({ success: true, data: page });
	} catch (error) {
		console.error('取得頁面失敗:', error);
		return NextResponse.json({ success: false, error: '取得頁面失敗' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const body = await request.json();

		const existing = await getPageById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該頁面' }, { status: 404 });
		}

		await updatePage(id, body);
		return NextResponse.json({ success: true, data: { id } });
	} catch (error) {
		console.error('更新頁面失敗:', error);
		return NextResponse.json({ success: false, error: '更新頁面失敗' }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		const existing = await getPageById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該頁面' }, { status: 404 });
		}

		await deletePage(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('刪除頁面失敗:', error);
		return NextResponse.json({ success: false, error: '刪除頁面失敗' }, { status: 500 });
	}
}
