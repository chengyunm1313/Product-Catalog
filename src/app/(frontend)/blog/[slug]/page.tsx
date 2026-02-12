/**
 * 部落格文章詳情頁
 * 從 Firestore 根據 slug 取得文章內容，用 TiptapRenderer 渲染
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/firestore/posts';
import TiptapRenderer from '@/components/editor/TiptapRenderer';
import styles from './article.module.css';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return { title: '找不到文章 — Brand' };
	}

	return {
		title: post.seo?.title || `${post.title} — 部落格 | Brand`,
		description: post.seo?.description || `閱讀文章：${post.title}`,
	};
}

export default async function BlogArticlePage({ params }: Props) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<article className={styles.page}>
			<div className={styles.container}>
				<nav className={styles.breadcrumb}>
					<Link href='/'>首頁</Link>
					<span>/</span>
					<Link href='/blog'>部落格</Link>
					<span>/</span>
					<span>{post.title}</span>
				</nav>

				<header className={styles.header}>
					<div className={styles.meta}>
						<time>
							{post.createdAt ? new Date(post.createdAt).toLocaleDateString('zh-TW') : ''}
						</time>
						<span className={styles.dot}>·</span>
						<span>{post.author}</span>
					</div>
					<h1>{post.title}</h1>

					{post.tags && post.tags.length > 0 && (
						<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
							{post.tags.map((tag) => (
								<span
									key={tag}
									style={{
										background: 'var(--color-surface)',
										padding: '0.25rem 0.75rem',
										borderRadius: '999px',
										fontSize: '0.8rem',
										color: 'var(--color-primary)',
									}}
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</header>

				{/* 封面圖 */}
				{post.coverImage && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={post.coverImage}
						alt={post.title}
						style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }}
					/>
				)}

				{/* 文章內容：Tiptap JSON 渲染 */}
				<div className={styles.body}>
					<TiptapRenderer content={post.contentJson} />
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
