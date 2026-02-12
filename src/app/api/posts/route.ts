/**
 * 文章 API 路由
 */

import { NextRequest, NextResponse } from 'next/server';

const posts = [
	{ id: '1', slug: 'industry-trends-2025', title: '2025 產業趨勢前瞻', status: 'published' },
	{ id: '2', slug: 'sensor-selection-guide', title: '感測器選型完全指南', status: 'published' },
];

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '10');

	return NextResponse.json({
		success: true,
		data: posts,
		total: posts.length,
		page,
		limit,
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		return NextResponse.json({ success: true, data: { id: 'new-id', ...body } }, { status: 201 });
	} catch {
		return NextResponse.json({ success: false, error: '無效的請求內容' }, { status: 400 });
	}
}
