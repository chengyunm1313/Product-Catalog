/**
 * 產品列表頁
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './products.module.css';

export const metadata: Metadata = {
	title: '產品目錄 — Brand',
	description: '瀏覽我們的完整產品系列，找到最適合您的解決方案。',
};

// 模擬產品資料（後續接 Firestore）
const mockProducts = [
	{
		id: '1',
		slug: 'product-a',
		name: '專業級工業感測器',
		description: '高精度溫度與濕度感測器，適用於各種工業環境。',
		price: 12800,
		images: [],
		category: '感測器',
	},
	{
		id: '2',
		slug: 'product-b',
		name: '智能控制模組',
		description: '支援多協議的智能控制模組，可遠端監控與操作。',
		price: 24500,
		images: [],
		category: '控制模組',
	},
	{
		id: '3',
		slug: 'product-c',
		name: '精密量測儀器',
		description: '高解析度精密量測設備，符合國際標準規範。',
		price: 56000,
		images: [],
		category: '量測儀器',
	},
	{
		id: '4',
		slug: 'product-d',
		name: '自動化控制系統',
		description: '一體化的生產線自動化控制解決方案。',
		price: 198000,
		images: [],
		category: '自動化系統',
	},
	{
		id: '5',
		slug: 'product-e',
		name: '環境監測站',
		description: '整合式環境資料監測解決方案，支援即時雲端數據。',
		price: 85000,
		images: [],
		category: '感測器',
	},
	{
		id: '6',
		slug: 'product-f',
		name: '工業級顯示面板',
		description: '高亮度 IP65 防護等級工業觸控面板。',
		price: 32000,
		images: [],
		category: '控制模組',
	},
];

const categories = ['全部', '感測器', '控制模組', '量測儀器', '自動化系統'];

export default function ProductsPage() {
	return (
		<section className={styles.page}>
			<div className='container'>
				{/* 頁面標題 */}
				<div className={styles.header}>
					<h1>產品目錄</h1>
					<p>探索我們的完整產品線，找到最適合您需求的解決方案</p>
				</div>

				{/* 分類篩選 */}
				<div className={styles.filters}>
					{categories.map((cat) => (
						<button key={cat} className={styles.filterBtn}>
							{cat}
						</button>
					))}
				</div>

				{/* 產品網格 */}
				<div className={styles.grid}>
					{mockProducts.map((product) => (
						<Link href={`/products/${product.slug}`} key={product.id} className={styles.card}>
							<div className={styles.imageWrapper}>
								<div className={styles.placeholder}>
									<span>{product.name[0]}</span>
								</div>
								<span className={styles.badge}>{product.category}</span>
							</div>
							<div className={styles.info}>
								<h3>{product.name}</h3>
								<p>{product.description}</p>
								<div className={styles.price}>NT$ {product.price.toLocaleString()}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
