/**
 * 後台儀表板首頁
 */

import styles from './dashboard.module.css';

const statCards = [
	{ label: '產品總數', value: '24', change: '+3', icon: '📦' },
	{ label: '文章總數', value: '18', change: '+5', icon: '📝' },
	{ label: '頁面總數', value: '6', change: '0', icon: '📄' },
	{ label: '媒體檔案', value: '142', change: '+12', icon: '🖼️' },
];

const recentActivity = [
	{ action: '新增產品', target: '智能控制模組 V2', time: '10 分鐘前' },
	{ action: '更新文章', target: '2025 產業趨勢前瞻', time: '1 小時前' },
	{ action: '上傳媒體', target: 'product-hero.jpg', time: '2 小時前' },
	{ action: '發佈頁面', target: '關於我們', time: '昨天' },
	{ action: '刪除產品', target: '舊型號感測器', time: '2 天前' },
];

export default function AdminDashboard() {
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
						{card.change !== '0' && <span className={styles.statChange}>{card.change}</span>}
					</div>
				))}
			</div>

			{/* 最近活動 */}
			<div className={styles.section}>
				<h2>最近活動</h2>
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
			</div>
		</div>
	);
}
