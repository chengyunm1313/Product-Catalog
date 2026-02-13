/**
 * 頁面導航 API
 * GET：取得已發佈頁面清單（供前台導航列使用）
 */

import { NextResponse } from 'next/server';
import { getPublishedPages } from '@/lib/firestore/pages';

export async function GET() {
	try {
		const pages = await getPublishedPages();
		return NextResponse.json({ success: true, items: pages });
	} catch (error) {
		console.error('取得導航頁面失敗:', error);
		return NextResponse.json({ success: false, items: [] }, { status: 500 });
	}
}
