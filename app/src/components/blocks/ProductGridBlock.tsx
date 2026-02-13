/**
 * Product Grid Block
 * 精選產品網格
 */

import Link from 'next/link';
import Image from 'next/image';
import type { ProductGridBlockData } from '@/types';
import styles from './ProductGridBlock.module.css';

interface ProductGridBlockProps {
	data: ProductGridBlockData;
}

// 展示用假資料（實際環境會從 API 取得）
const mockProducts = [
	{ id: '1', slug: 'product-1', name: '經典商品 A', price: 1200, image: '' },
	{ id: '2', slug: 'product-2', name: '精選商品 B', price: 2400, image: '' },
	{ id: '3', slug: 'product-3', name: '熱銷商品 C', price: 3600, image: '' },
	{ id: '4', slug: 'product-4', name: '新品上架 D', price: 4800, image: '' },
];

export default function ProductGridBlock({ data }: ProductGridBlockProps) {
	const products = mockProducts.slice(0, data.limit || 4);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.sectionTitle}>{data.title || '精選產品'}</h2>
				<div className={styles.grid}>
					{products.map((product) => (
						<Link key={product.id} href={`/products/${product.slug}`} className={styles.card}>
							<div className={styles.imageWrapper}>
								{product.image ? (
									<Image
										src={product.image}
										alt={product.name}
										fill
										style={{ objectFit: 'cover' }}
									/>
								) : (
									<div className={styles.imagePlaceholder}>
										<span>📦</span>
									</div>
								)}
							</div>
							<div className={styles.info}>
								<h3 className={styles.productName}>{product.name}</h3>
								<p className={styles.price}>NT$ {product.price.toLocaleString()}</p>
							</div>
						</Link>
					))}
				</div>
				<div className={styles.viewAll}>
					<Link href='/products' className='btn btn-secondary'>
						查看所有產品
					</Link>
				</div>
			</div>
		</section>
	);
}
