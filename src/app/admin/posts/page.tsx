/**
 * 後台 — 文章管理列表
 */

import Link from 'next/link';
import styles from './posts-admin.module.css';

const mockPosts = [
	{
		id: '1',
		title: '2025 產業趨勢前瞻',
		status: 'published',
		author: '管理員',
		updatedAt: '2025-01-15',
	},
	{
		id: '2',
		title: '感測器選型完全指南',
		status: 'published',
		author: '管理員',
		updatedAt: '2025-01-08',
	},
	{ id: '3', title: '品質保證流程揭密', status: 'draft', author: '編輯', updatedAt: '2024-12-20' },
	{
		id: '4',
		title: '智慧工廠導入案例分享',
		status: 'published',
		author: '管理員',
		updatedAt: '2024-12-10',
	},
];

export default function AdminPostsPage() {
	return (
		<div>
			<div className={styles.header}>
				<h1>文章管理</h1>
				<Link href='/admin/posts/new' className='btn btn-primary'>
					＋ 新增文章
				</Link>
			</div>

			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>文章標題</th>
							<th>狀態</th>
							<th>作者</th>
							<th>更新時間</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{mockPosts.map((p) => (
							<tr key={p.id}>
								<td>
									<span className={styles.postTitle}>{p.title}</span>
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
								<td>{p.author}</td>
								<td>{p.updatedAt}</td>
								<td>
									<div className={styles.actions}>
										<Link href={`/admin/posts/${p.id}`} className={styles.editBtn}>
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
