/**
 * 後台 — 產品管理列表
 */

import Link from 'next/link';
import styles from './products-admin.module.css';

const mockProducts = [
	{ id: '1', name: '專業級工業感測器', status: 'published', price: 12800, updatedAt: '2025-01-15' },
	{ id: '2', name: '智能控制模組', status: 'published', price: 24500, updatedAt: '2025-01-12' },
	{ id: '3', name: '精密量測儀器', status: 'draft', price: 56000, updatedAt: '2025-01-10' },
	{ id: '4', name: '自動化控制系統', status: 'published', price: 198000, updatedAt: '2025-01-08' },
	{ id: '5', name: '環境監測站', status: 'draft', price: 85000, updatedAt: '2025-01-05' },
];

export default function AdminProductsPage() {
	return (
		<div>
			<div className={styles.header}>
				<h1>產品管理</h1>
				<Link href='/admin/products/new' className='btn btn-primary'>
					＋ 新增產品
				</Link>
			</div>

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
						{mockProducts.map((p) => (
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
								<td>{p.updatedAt}</td>
								<td>
									<div className={styles.actions}>
										<Link href={`/admin/products/${p.id}`} className={styles.editBtn}>
											編輯
										</Link>
										<button className={styles.deleteBtn}>刪除</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
