/**
 * 產品詳細頁
 * 從 Firestore 根據 slug 取得產品資料
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/firestore/products';
import TiptapRenderer from '@/components/editor/TiptapRenderer';
import styles from './detail.module.css';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return { title: '找不到產品 — Brand' };
	}

	return {
		title: product.seo?.title || `${product.name} — Brand`,
		description: product.seo?.description || `查看 ${product.name} 的詳細規格與介紹。`,
	};
}

export default async function ProductDetailPage({ params }: Props) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const specEntries = product.specs ? Object.entries(product.specs) : [];

	return (
		<section className={styles.page}>
			<div className='container'>
				<nav className={styles.breadcrumb}>
					<Link href='/'>首頁</Link>
					<span>/</span>
					<Link href='/products'>產品目錄</Link>
					<span>/</span>
					<span>{product.name}</span>
				</nav>

				<div className={styles.layout}>
					{/* 產品圖片 */}
					<div className={styles.gallery}>
						<div className={styles.mainImage}>
							{product.images && product.images[0] ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={product.images[0]}
									alt={product.name}
									style={{ width: '100%', borderRadius: '12px' }}
								/>
							) : (
								<div className={styles.placeholder}>
									<span>{product.name[0]?.toUpperCase()}</span>
								</div>
							)}
						</div>
					</div>

					{/* 產品資訊 */}
					<div className={styles.details}>
						<h1>{product.name}</h1>
						<div className={styles.price}>NT$ {product.price.toLocaleString()}</div>

						{product.sku && (
							<p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
								SKU: {product.sku}
							</p>
						)}

						{/* 產品描述（Tiptap 渲染） */}
						<div className={styles.desc}>
							<TiptapRenderer content={product.descriptionJson} />
						</div>

						{/* 產品規格 */}
						{specEntries.length > 0 && (
							<div className={styles.specs}>
								<h3>產品規格</h3>
								<table>
									<tbody>
										{specEntries.map(([label, value]) => (
											<tr key={label}>
												<td className={styles.specLabel}>{label}</td>
												<td>{value}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}

						{/* 標籤 */}
						{product.tags && product.tags.length > 0 && (
							<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
								{product.tags.map((tag) => (
									<span
										key={tag}
										style={{
											background: 'var(--color-surface)',
											padding: '0.25rem 0.75rem',
											borderRadius: '999px',
											fontSize: '0.8rem',
											color: 'var(--color-text-secondary)',
										}}
									>
										{tag}
									</span>
								))}
							</div>
						)}

						<button className='btn btn-primary' style={{ marginTop: '1.5rem' }}>
							聯絡詢價
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
