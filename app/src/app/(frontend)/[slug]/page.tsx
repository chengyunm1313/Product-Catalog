/**
 * 動態頁面（前台）
 * 根據 slug 從 Firestore 取得後台建立的自訂頁面，以 Block 系統渲染
 */

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/firestore/pages';
import BlockRenderer from '@/components/blocks/BlockRenderer';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const page = await getPageBySlug(slug);

	if (!page) {
		return { title: '找不到頁面' };
	}

	return {
		title: page.seo?.title || `${page.title} — Brand`,
		description: page.seo?.description || '',
	};
}

export default async function DynamicPage({ params }: Props) {
	const { slug } = await params;
	const page = await getPageBySlug(slug);

	if (!page) {
		notFound();
	}

	return (
		<main>
			{page.blocks && page.blocks.length > 0 ? (
				<BlockRenderer blocks={page.blocks} />
			) : (
				<section style={{ padding: '4rem 0', textAlign: 'center' }}>
					<div className='container'>
						<h1>{page.title}</h1>
						<p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
							此頁面尚無內容
						</p>
					</div>
				</section>
			)}
		</main>
	);
}
