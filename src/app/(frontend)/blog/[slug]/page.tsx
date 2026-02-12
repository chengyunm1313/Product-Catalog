/**
 * 部落格文章詳情頁
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './article.module.css';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	return {
		title: `${slug.replace(/-/g, ' ')} — 部落格 | Brand`,
		description: `閱讀文章：${slug.replace(/-/g, ' ')}`,
	};
}

export default async function BlogArticlePage({ params }: Props) {
	const { slug } = await params;
	const title = slug.replace(/-/g, ' ');

	return (
		<article className={styles.page}>
			<div className={styles.container}>
				<nav className={styles.breadcrumb}>
					<Link href='/'>首頁</Link>
					<span>/</span>
					<Link href='/blog'>部落格</Link>
					<span>/</span>
					<span>{title}</span>
				</nav>

				<header className={styles.header}>
					<div className={styles.meta}>
						<time>2025-01-15</time>
						<span className={styles.dot}>·</span>
						<span>5 分鐘閱讀</span>
					</div>
					<h1>{title}</h1>
					<p className={styles.excerpt}>深入探討相關主題的最新趨勢與觀點，帶您了解產業動態。</p>
				</header>

				<div className={styles.body}>
					<p>
						這是一篇示範文章的內容。在正式版本中，此處將由 Tiptap 渲染器 根據儲存在 Firestore 的
						JSON 內容動態產生。
					</p>
					<h2>章節標題</h2>
					<p>
						我們致力於提供最高品質的產品與服務。透過不斷的技術創新和品質改進，
						我們在業界建立了卓越的聲譽。以下將詳細說明我們的核心技術優勢。
					</p>
					<h3>技術細節</h3>
					<p>
						採用先進的製造工藝和嚴格的品質管控流程，每一件產品都經過多道
						自動化檢測工序，確保符合國際標準。
					</p>
					<blockquote>
						<p>品質不是偶然，而是持續追求卓越的結果。</p>
					</blockquote>
				</div>

				<footer className={styles.footer}>
					<Link href='/blog' className='btn btn-secondary'>
						← 返回部落格
					</Link>
				</footer>
			</div>
		</article>
	);
}
