/**
 * 產品 API 路由
 */

import { NextRequest, NextResponse } from 'next/server';

// 模擬產品資料（正式版接 Firestore）
const products = [
	{ id: '1', slug: 'product-a', name: '專業級工業感測器', price: 12800, status: 'published' },
	{ id: '2', slug: 'product-b', name: '智能控制模組', price: 24500, status: 'published' },
];

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '10');

	// TODO: 正式版改接 Firestore
	return NextResponse.json({
		success: true,
		data: products,
		total: products.length,
		page,
		limit,
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// TODO: 正式版加 auth 驗證 + Firestore 新增
		return NextResponse.json({ success: true, data: { id: 'new-id', ...body } }, { status: 201 });
	} catch {
		return NextResponse.json({ success: false, error: '無效的請求內容' }, { status: 400 });
	}
}
