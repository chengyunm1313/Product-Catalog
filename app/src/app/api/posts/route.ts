/**
 * 文章 API 路由
 * GET：取得所有文章（後台）或已發布文章（前台）
 * POST：新增文章
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPublishedPosts, createPost } from '@/lib/firestore/posts';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '10');
	const admin = searchParams.get('admin') === 'true';

	try {
		if (admin) {
			const posts = await getAllPosts();
			return NextResponse.json({ success: true, data: posts, total: posts.length });
		}

		const result = await getPublishedPosts(page, limit);
		return NextResponse.json({ success: true, ...result });
	} catch (error) {
		console.error('取得文章失敗:', error);
		return NextResponse.json({ success: false, error: '取得文章失敗' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const id = await createPost({
			slug: body.slug,
			title: body.title,
			excerpt: body.excerpt || '',
			status: body.status || 'draft',
			contentJson: body.contentJson || null,
			seo: body.seo || { title: '', description: '' },
			coverImage: body.coverImage || '',
			tags: body.tags || [],
			author: body.author || '管理員',
		});

		return NextResponse.json({ success: true, data: { id } }, { status: 201 });
	} catch (error) {
		console.error('新增文章失敗:', error);
		return NextResponse.json({ success: false, error: '新增文章失敗' }, { status: 500 });
	}
}
