/**
 * 首頁
 * Block-Based 設計，展示 Hero + 精選產品 + 最新文章 + CTA
 */

import type { Metadata } from 'next';
import type { BlockData } from '@/types';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export const metadata: Metadata = {
	title: 'Brand — 首頁',
	description: '探索我們的精選產品與最新消息，了解品牌故事。',
};

// 首頁預設 Blocks（可透過後台管理替換）
const homeBlocks: BlockData[] = [
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

export default function HomePage() {
	return <BlockRenderer blocks={homeBlocks} />;
}
