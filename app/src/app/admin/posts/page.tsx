/**
 * 後台 — 文章管理列表
 * 從 Firestore 取得真實資料
 */

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/firestore/posts';
import PostDeleteButton from './PostDeleteButton';

export default async function AdminPostsPage() {
	const posts = await getAllPosts();

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '1.5rem',
				}}
			>
				<h1>文章管理</h1>
				<Link href='/admin/posts/new' className='btn btn-primary'>
					＋ 新增文章
				</Link>
			</div>

			{posts.length === 0 ? (
				<div
					style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}
				>
					<p>目前沒有文章資料</p>
					<Link
						href='/admin/posts/new'
						className='btn btn-primary'
						style={{ marginTop: '1rem', display: 'inline-block' }}
					>
						撰寫第一篇文章
					</Link>
				</div>
			) : (
				<div style={{ overflowX: 'auto' }}>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr style={{ borderBottom: '2px solid var(--color-border)' }}>
								<th
									style={{
										textAlign: 'left',
										padding: '0.75rem',
										fontSize: '0.8rem',
										color: 'var(--color-text-secondary)',
									}}
								>
									文章標題
								</th>
								<th
									style={{
										textAlign: 'left',
										padding: '0.75rem',
										fontSize: '0.8rem',
										color: 'var(--color-text-secondary)',
									}}
								>
									狀態
								</th>
								<th
									style={{
										textAlign: 'left',
										padding: '0.75rem',
										fontSize: '0.8rem',
										color: 'var(--color-text-secondary)',
									}}
								>
									作者
								</th>
								<th
									style={{
										textAlign: 'left',
										padding: '0.75rem',
										fontSize: '0.8rem',
										color: 'var(--color-text-secondary)',
									}}
								>
									更新時間
								</th>
								<th
									style={{
										textAlign: 'left',
										padding: '0.75rem',
										fontSize: '0.8rem',
										color: 'var(--color-text-secondary)',
									}}
								>
									操作
								</th>
							</tr>
						</thead>
						<tbody>
							{posts.map((post) => (
								<tr key={post.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
									<td style={{ padding: '0.75rem', fontWeight: 500 }}>{post.title}</td>
									<td style={{ padding: '0.75rem' }}>
										<span
											style={{
												padding: '0.125rem 0.5rem',
												borderRadius: '12px',
												fontSize: '0.75rem',
												fontWeight: 600,
												background: post.status === 'published' ? '#ecfdf5' : '#fef3c7',
												color: post.status === 'published' ? '#065f46' : '#92400e',
											}}
										>
											{post.status === 'published' ? '已發佈' : '草稿'}
										</span>
									</td>
									<td
										style={{
											padding: '0.75rem',
											color: 'var(--color-text-secondary)',
											fontSize: '0.875rem',
										}}
									>
										{post.author || '-'}
									</td>
									<td
										style={{
											padding: '0.75rem',
											color: 'var(--color-text-secondary)',
											fontSize: '0.875rem',
										}}
									>
										{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('zh-TW') : '-'}
									</td>
									<td style={{ padding: '0.75rem' }}>
										<div style={{ display: 'flex', gap: '0.5rem' }}>
											<Link
												href={`/admin/posts/${post.id}`}
												style={{
													padding: '0.25rem 0.625rem',
													borderRadius: '6px',
													border: '1px solid var(--color-border)',
													background: 'transparent',
													color: 'var(--color-primary)',
													fontSize: '0.8rem',
													textDecoration: 'none',
												}}
											>
												編輯
											</Link>
											<PostDeleteButton id={post.id} title={post.title} />
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
