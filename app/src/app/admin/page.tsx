/**
 * 後台儀表板首頁
 * 從 Firestore 取得動態統計
 */

export const dynamic = 'force-dynamic';

import { getAllProducts } from '@/lib/firestore/products';
import { getAllPosts } from '@/lib/firestore/posts';
import styles from './dashboard.module.css';

export default async function AdminDashboard() {
	const products = await getAllProducts();
	const posts = await getAllPosts();

	const publishedProducts = products.filter((p) => p.status === 'published').length;
	const publishedPosts = posts.filter((p) => p.status === 'published').length;

	const statCards = [
		{
			label: '產品總數',
			value: String(products.length),
			sub: `${publishedProducts} 已發佈`,
			icon: '📦',
		},
		{ label: '文章總數', value: String(posts.length), sub: `${publishedPosts} 已發佈`, icon: '📝' },
		{ label: '頁面總數', value: '-', sub: '需完善頁面管理', icon: '📄' },
		{ label: '媒體檔案', value: '-', sub: '需完善媒體管理', icon: '🖼️' },
	];

	/* 依照更新時間排序，取最近 5 筆 */
	type ActivityItem = { action: string; target: string; time: string };
	const recentActivity: ActivityItem[] = [];

	products
		.sort((a, b) => {
			const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
			const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
			return tb - ta;
		})
		.slice(0, 3)
		.forEach((p) => {
			recentActivity.push({
				action: '產品更新',
				target: p.name,
				time: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('zh-TW') : '-',
			});
		});

	posts
		.sort((a, b) => {
			const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
			const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
			return tb - ta;
		})
		.slice(0, 3)
		.forEach((p) => {
			recentActivity.push({
				action: '文章更新',
				target: p.title,
				time: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('zh-TW') : '-',
			});
		});

	return (
		<div>
			<div className={styles.header}>
				<h1>儀表板</h1>
				<p>歡迎回來，管理員。以下是您的網站概覽。</p>
			</div>

			{/* 統計卡片 */}
			<div className={styles.statsGrid}>
				{statCards.map((card) => (
					<div key={card.label} className={styles.statCard}>
						<div className={styles.statIcon}>{card.icon}</div>
						<div className={styles.statInfo}>
							<span className={styles.statLabel}>{card.label}</span>
							<span className={styles.statValue}>{card.value}</span>
						</div>
						{card.sub && <span className={styles.statChange}>{card.sub}</span>}
					</div>
				))}
			</div>

			{/* 最近活動 */}
			<div className={styles.section}>
				<h2>最近活動</h2>
				{recentActivity.length === 0 ? (
					<p style={{ color: 'var(--color-text-secondary)', padding: '1rem 0' }}>
						尚無任何活動紀錄
					</p>
				) : (
					<div className={styles.activityList}>
						{recentActivity.map((item, i) => (
							<div key={i} className={styles.activityItem}>
								<div className={styles.activityDot} />
								<div className={styles.activityContent}>
									<span className={styles.activityAction}>{item.action}</span>
									<span className={styles.activityTarget}>{item.target}</span>
								</div>
								<time className={styles.activityTime}>{item.time}</time>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
