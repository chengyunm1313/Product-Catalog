/**
 * 單篇文章 API 路由
 * GET / PUT / DELETE
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/firestore/posts';

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const post = await getPostById(id);

		if (!post) {
			return NextResponse.json({ success: false, error: '找不到該文章' }, { status: 404 });
		}

		return NextResponse.json({ success: true, data: post });
	} catch (error) {
		console.error('取得文章失敗:', error);
		return NextResponse.json({ success: false, error: '取得文章失敗' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;
		const body = await request.json();

		const existing = await getPostById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該文章' }, { status: 404 });
		}

		await updatePost(id, body);
		return NextResponse.json({ success: true, data: { id } });
	} catch (error) {
		console.error('更新文章失敗:', error);
		return NextResponse.json({ success: false, error: '更新文章失敗' }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		const existing = await getPostById(id);
		if (!existing) {
			return NextResponse.json({ success: false, error: '找不到該文章' }, { status: 404 });
		}

		await deletePost(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('刪除文章失敗:', error);
		return NextResponse.json({ success: false, error: '刪除文章失敗' }, { status: 500 });
	}
}
