/**
 * 單筆產品 API 路由
 * GET / PUT / DELETE
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/firestore/products';

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const product = await getProductById(id);

		if (!product) {
			return NextResponse.json({ success: false, error: '找不到該產品' }, { status: 404 });
		}

		return NextResponse.json({ success: true, data: product });
	} catch (error) {
		console.error('取得產品失敗:', error);
		return NextResponse.json({ success: false, error: '取得產品失敗' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const body = await request.json();

		const existing = await getProductById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該產品' }, { status: 404 });
		}

		await updateProduct(id, body);
		return NextResponse.json({ success: true, data: { id } });
	} catch (error) {
		console.error('更新產品失敗:', error);
		return NextResponse.json({ success: false, error: '更新產品失敗' }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		const existing = await getProductById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該產品' }, { status: 404 });
		}

		await deleteProduct(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('刪除產品失敗:', error);
		return NextResponse.json({ success: false, error: '刪除產品失敗' }, { status: 500 });
	}
}
