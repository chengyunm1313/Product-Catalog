/**
 * 頁面 API 路由
 * GET：取得所有頁面
 * POST：新增頁面
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPages, createPage } from '@/lib/firestore/pages';

export async function GET() {
	try {
		const pages = await getAllPages();
		return NextResponse.json({ success: true, data: pages, total: pages.length });
	} catch (error) {
		console.error('取得頁面失敗:', error);
		return NextResponse.json({ success: false, error: '取得頁面失敗' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const id = await createPage({
			slug: body.slug,
			title: body.title,
			blocks: body.blocks || [],
			status: body.status || 'draft',
			seo: body.seo || { title: '', description: '' },
		});

		return NextResponse.json({ success: true, data: { id } }, { status: 201 });
	} catch (error) {
		console.error('新增頁面失敗:', error);
		return NextResponse.json({ success: false, error: '新增頁面失敗' }, { status: 500 });
	}
}
