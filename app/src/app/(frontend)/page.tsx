/**
 * 首頁
 * Block-Based 設計，優先從 Firestore 讀取，fallback 使用預設 blocks
 */

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import type { BlockData } from '@/types';
import { getPageBySlug } from '@/lib/firestore/pages';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export const metadata: Metadata = {
	title: 'Brand — 首頁',
	description: '探索我們的精選產品與最新消息，了解品牌故事。',
};

// 首頁預設 Blocks（Firestore 尚無 home 頁時使用）
const defaultBlocks: BlockData[] = [
	{
		type: 'hero',
		data: {
			title: '探索卓越品質',
			subtitle: '精心挑選的產品系列，為您帶來最佳體驗',
			images: [],
			buttonText: '瀏覽產品',
			buttonLink: '/products',
		},
	},
	{
		type: 'productGrid',
		data: {
			title: '精選產品',
			productIds: [],
			limit: 4,
		},
	},
	{
		type: 'blogList',
		data: {
			title: '最新文章',
			limit: 3,
		},
	},
	{
		type: 'customCTA',
		data: {
			title: '與我們聯繫',
			description: '有任何問題或合作需求？歡迎與我們的團隊聯繫，我們將竭誠為您服務。',
			buttonText: '聯絡我們',
			buttonLink: '/contact',
		},
	},
];

export default async function HomePage() {
	let blocks = defaultBlocks;

	try {
		const page = await getPageBySlug('home');
		if (page?.blocks && page.blocks.length > 0) {
			blocks = page.blocks;
		}
	} catch {
		// Firestore 讀取失敗時使用預設 blocks
	}

	return <BlockRenderer blocks={blocks} />;
}
