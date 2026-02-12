/**
 * 部落格列表頁
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './blog.module.css';

export const metadata: Metadata = {
	title: '部落格 — Brand',
	description: '閱讀我們的最新文章、產業洞見與技術分享。',
};

const mockPosts = [
	{
		id: '1',
		slug: 'industry-trends-2025',
		title: '2025 產業趨勢前瞻',
		excerpt: '深入分析未來一年的產業變革方向，從自動化到智慧製造的關鍵趨勢。',
		coverImage: '',
		createdAt: '2025-01-15',
		tags: ['產業趨勢', '智慧製造'],
	},
	{
		id: '2',
		slug: 'sensor-selection-guide',
		title: '感測器選型完全指南',
		excerpt: '如何根據應用場景選擇最合適的感測器？本文整理了常見的選型要點與注意事項。',
		coverImage: '',
		createdAt: '2025-01-08',
		tags: ['技術指南', '感測器'],
	},
	{
		id: '3',
		slug: 'quality-assurance-process',
		title: '品質保證流程揭密',
		excerpt: '了解我們如何透過嚴格的品質控管流程，確保每一件產品符合最高標準。',
		coverImage: '',
		createdAt: '2024-12-20',
		tags: ['品質管理'],
	},
	{
		id: '4',
		slug: 'smart-factory-case-study',
		title: '智慧工廠導入案例分享',
		excerpt: '某大型製造商透過我們的系統成功將產線效能提升 30%，看看他們是怎麼做到的。',
		coverImage: '',
		createdAt: '2024-12-10',
		tags: ['案例分享', '自動化'],
	},
];

export default function BlogPage() {
	return (
		<section className={styles.page}>
			<div className='container'>
				<div className={styles.header}>
					<h1>部落格</h1>
					<p>產業洞見、技術分享與最新消息</p>
				</div>

				<div className={styles.grid}>
					{mockPosts.map((post) => (
						<Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
							<div className={styles.imageWrapper}>
								<div className={styles.placeholder} />
							</div>
							<div className={styles.content}>
								<div className={styles.tags}>
									{post.tags.map((tag) => (
										<span key={tag} className={styles.tag}>
											{tag}
										</span>
									))}
								</div>
								<h2>{post.title}</h2>
								<p>{post.excerpt}</p>
								<time className={styles.date}>{post.createdAt}</time>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
