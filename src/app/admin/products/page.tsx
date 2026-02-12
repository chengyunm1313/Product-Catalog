/**
 * 後台 — 產品管理列表
 * 從 Firestore 取得真實資料
 */

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllProducts } from '@/lib/firestore/products';
import styles from './products-admin.module.css';
import ProductDeleteButton from './ProductDeleteButton';

export default async function AdminProductsPage() {
	const products = await getAllProducts();

	return (
		<div>
			<div className={styles.header}>
				<h1>產品管理</h1>
				<Link href='/admin/products/new' className='btn btn-primary'>
					＋ 新增產品
				</Link>
			</div>

			{products.length === 0 ? (
				<div
					style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}
				>
					<p>目前沒有產品資料</p>
					<Link
						href='/admin/products/new'
						className='btn btn-primary'
						style={{ marginTop: '1rem', display: 'inline-block' }}
					>
						新增第一個產品
					</Link>
				</div>
			) : (
				<div className={styles.tableWrapper}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>產品名稱</th>
								<th>狀態</th>
								<th>價格</th>
								<th>更新時間</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{products.map((p) => (
								<tr key={p.id}>
									<td>
										<span className={styles.productName}>{p.name}</span>
									</td>
									<td>
										<span
											className={`${styles.badge} ${
												p.status === 'published' ? styles.published : styles.draft
											}`}
										>
											{p.status === 'published' ? '已發佈' : '草稿'}
										</span>
									</td>
									<td>NT$ {p.price.toLocaleString()}</td>
									<td>{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('zh-TW') : '-'}</td>
									<td>
										<div className={styles.actions}>
											<Link href={`/admin/products/${p.id}`} className={styles.editBtn}>
												編輯
											</Link>
											<ProductDeleteButton id={p.id} name={p.name} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
