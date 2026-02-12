/**
 * 產品詳細頁
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './detail.module.css';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	return {
		title: `${slug} — 產品詳情 | Brand`,
		description: `查看 ${slug} 的詳細規格與介紹。`,
	};
}

export default async function ProductDetailPage({ params }: Props) {
	const { slug } = await params;

	// TODO: 從 Firestore 撈取真實產品資料
	const product = {
		name: slug.replace(/-/g, ' '),
		description:
			'這是一款高品質的產品，採用先進技術製造，適用於各種專業場景。我們嚴格把關每一個生產環節，確保產品品質達到最高標準。',
		price: 12800,
		specs: [
			{ label: '型號', value: 'XX-100' },
			{ label: '尺寸', value: '120 x 80 x 45 mm' },
			{ label: '重量', value: '350g' },
			{ label: '工作溫度', value: '-20°C ~ 60°C' },
			{ label: '防護等級', value: 'IP65' },
		],
	};

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
							<div className={styles.placeholder}>
								<span>{product.name[0]?.toUpperCase()}</span>
							</div>
						</div>
					</div>

					{/* 產品資訊 */}
					<div className={styles.details}>
						<h1>{product.name}</h1>
						<div className={styles.price}>NT$ {product.price.toLocaleString()}</div>
						<p className={styles.desc}>{product.description}</p>

						<div className={styles.specs}>
							<h3>產品規格</h3>
							<table>
								<tbody>
									{product.specs.map((spec) => (
										<tr key={spec.label}>
											<td className={styles.specLabel}>{spec.label}</td>
											<td>{spec.value}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<button className='btn btn-primary' style={{ marginTop: '1.5rem' }}>
							聯絡詢價
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
