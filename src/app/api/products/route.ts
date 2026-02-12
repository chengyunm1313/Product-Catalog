/**
 * 產品 API 路由
 * GET：取得所有產品（後台）或已發布產品（前台）
 * POST：新增產品
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getPublishedProducts, createProduct } from '@/lib/firestore/products';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '12');
	const admin = searchParams.get('admin') === 'true';

	try {
		if (admin) {
			const products = await getAllProducts();
			return NextResponse.json({ success: true, data: products, total: products.length });
		}

		const result = await getPublishedProducts(page, limit);
		return NextResponse.json({ success: true, ...result });
	} catch (error) {
		console.error('取得產品失敗:', error);
		return NextResponse.json({ success: false, error: '取得產品失敗' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const id = await createProduct({
			slug: body.slug,
			name: body.name,
			descriptionJson: body.descriptionJson || null,
			price: body.price || 0,
			sku: body.sku || '',
			status: body.status || 'draft',
			images: body.images || [],
			categoryIds: body.categoryIds || [],
			tags: body.tags || [],
			specs: body.specs || {},
			seo: body.seo || { title: '', description: '' },
		});

		return NextResponse.json({ success: true, data: { id } }, { status: 201 });
	} catch (error) {
		console.error('新增產品失敗:', error);
		return NextResponse.json({ success: false, error: '新增產品失敗' }, { status: 500 });
	}
}
