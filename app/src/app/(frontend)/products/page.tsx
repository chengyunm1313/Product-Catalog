/**
 * 產品列表頁
 * 從 Firestore 取得已發布產品
 */

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedProducts } from '@/lib/firestore/products';
import styles from './products.module.css';

export const metadata: Metadata = {
	title: '產品目錄 — Brand',
	description: '瀏覽我們的完整產品系列，找到最適合您的解決方案。',
};

export default async function ProductsPage() {
	const { items: products } = await getPublishedProducts(1, 50);

	return (
		<section className={styles.page}>
			<div className='container'>
				{/* 頁面標題 */}
				<div className={styles.header}>
					<h1>產品目錄</h1>
					<p>探索我們的完整產品線，找到最適合您需求的解決方案</p>
				</div>

				{/* 產品網格 */}
				{products.length === 0 ? (
					<div className={styles.empty}>
						<p>目前沒有產品，請先至後台新增。</p>
						<Link href='/admin/products' className='btn btn-primary'>
							前往後台
						</Link>
					</div>
				) : (
					<div className={styles.grid}>
						{products.map((product) => (
							<Link href={`/products/${product.slug}`} key={product.id} className={styles.card}>
								<div className={styles.imageWrapper}>
									{product.images && product.images[0] ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={product.images[0]} alt={product.name} className={styles.image} />
									) : (
										<div className={styles.placeholder}>
											<span>{product.name[0]}</span>
										</div>
									)}
									{product.tags?.[0] && <span className={styles.badge}>{product.tags[0]}</span>}
								</div>
								<div className={styles.info}>
									<h3>{product.name}</h3>
									<p>{product.seo?.description || ''}</p>
									<div className={styles.price}>NT$ {product.price.toLocaleString()}</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
