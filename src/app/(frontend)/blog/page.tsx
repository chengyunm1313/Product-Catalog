/**
 * 部落格列表頁
 * 從 Firestore 取得已發布文章
 */

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/firestore/posts';
import styles from './blog.module.css';

export const metadata: Metadata = {
	title: '部落格 — Brand',
	description: '閱讀我們的最新文章、產業洞見與技術分享。',
};

export default async function BlogPage() {
	const { items: posts } = await getPublishedPosts(1, 20);

	return (
		<section className={styles.page}>
			<div className='container'>
				<div className={styles.header}>
					<h1>部落格</h1>
					<p>產業洞見、技術分享與最新消息</p>
				</div>

				{posts.length === 0 ? (
					<div
						style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}
					>
						<p>目前沒有文章，請先至後台新增。</p>
						<Link
							href='/admin/posts'
							className='btn btn-primary'
							style={{ marginTop: '1rem', display: 'inline-block' }}
						>
							前往後台
						</Link>
					</div>
				) : (
					<div className={styles.grid}>
						{posts.map((post) => (
							<Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
								<div className={styles.imageWrapper}>
									{post.coverImage ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={post.coverImage} alt={post.title} className={styles.coverImg} />
									) : (
										<div className={styles.placeholder} />
									)}
								</div>
								<div className={styles.content}>
									<div className={styles.tags}>
										{post.tags?.map((tag) => (
											<span key={tag} className={styles.tag}>
												{tag}
											</span>
										))}
									</div>
									<h2>{post.title}</h2>
									<p>{post.seo?.description || ''}</p>
									<time className={styles.date}>
										{post.createdAt ? new Date(post.createdAt).toLocaleDateString('zh-TW') : ''}
									</time>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
