/**
 * Blog List Block
 * 最新文章列表
 */

import Link from 'next/link';
import Image from 'next/image';
import type { BlogListBlockData } from '@/types';
import styles from './BlogListBlock.module.css';

interface BlogListBlockProps {
	data: BlogListBlockData;
}

// 展示用假資料
const mockPosts = [
	{
		id: '1',
		slug: 'post-1',
		title: '如何選擇最適合的產品',
		date: '2026-02-10',
		excerpt: '選購指南，幫助您快速找到合適的商品...',
		coverImage: '',
	},
	{
		id: '2',
		slug: 'post-2',
		title: '2026 年產業趨勢分析',
		date: '2026-02-05',
		excerpt: '深入分析今年最受關注的產業發展方向...',
		coverImage: '',
	},
	{
		id: '3',
		slug: 'post-3',
		title: '品牌故事：從零到一的旅程',
		date: '2026-01-28',
		excerpt: '回顧品牌創立以來的成長歷程與里程碑...',
		coverImage: '',
	},
];

export default function BlogListBlock({ data }: BlogListBlockProps) {
	const posts = mockPosts.slice(0, data.limit || 3);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.sectionTitle}>{data.title || '最新文章'}</h2>
				<div className={styles.list}>
					{posts.map((post) => (
						<Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
							<div className={styles.imageWrapper}>
								{post.coverImage ? (
									<Image
										src={post.coverImage}
										alt={post.title}
										fill
										style={{ objectFit: 'cover' }}
									/>
								) : (
									<div className={styles.imagePlaceholder}>
										<span>📝</span>
									</div>
								)}
							</div>
							<div className={styles.info}>
								<time className={styles.date}>{post.date}</time>
								<h3 className={styles.postTitle}>{post.title}</h3>
								<p className={styles.excerpt}>{post.excerpt}</p>
								<span className={styles.readMore}>閱讀更多 →</span>
							</div>
						</Link>
					))}
				</div>
				<div className={styles.viewAll}>
					<Link href='/blog' className='btn btn-secondary'>
						查看所有文章
					</Link>
				</div>
			</div>
		</section>
	);
}
