/**
 * 文章編輯表單（Client Component）
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import type { Post } from '@/types';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from '../../form.module.css';

interface Props {
	post: Post;
}

export default function PostEditForm({ post }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [contentJson, setContentJson] = useState<JSONContent>(
		post.contentJson || { type: 'doc', content: [{ type: 'paragraph' }] }
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		const form = new FormData(e.currentTarget);

		const body = {
			title: form.get('title'),
			slug: form.get('slug'),
			excerpt: form.get('excerpt'),
			author: form.get('author'),
			status: form.get('status'),
			tags:
				(form.get('tags') as string)
					?.split(',')
					.map((t) => t.trim())
					.filter(Boolean) || [],
			contentJson,
			seo: {
				title: form.get('seoTitle') || '',
				description: form.get('seoDescription') || '',
			},
		};

		try {
			const res = await fetch(`/api/posts/${post.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				setMessage('文章已更新');
				router.refresh();
			} else {
				setError(data.error || '更新失敗');
			}
		} catch {
			setError('更新失敗，請檢查網路連線。');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.formPage}>
			<h1>編輯文章：{post.title}</h1>

			{message && <div className={`${styles.alert} ${styles.alertSuccess}`}>{message}</div>}
			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>文章標題 *</label>
						<input name='title' required defaultValue={post.title} />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required defaultValue={post.slug} />
					</div>
				</div>

				<div className={styles.formRow3}>
					<div className={styles.formGroup}>
						<label>作者</label>
						<input name='author' defaultValue={post.author} />
					</div>
					<div className={styles.formGroup}>
						<label>狀態</label>
						<select name='status' defaultValue={post.status}>
							<option value='draft'>草稿</option>
							<option value='published'>發佈</option>
						</select>
					</div>
					<div className={styles.formGroup}>
						<label>標籤（以逗號分隔）</label>
						<input name='tags' defaultValue={post.tags?.join(', ')} />
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>摘要</label>
					<textarea name='excerpt' defaultValue={post.excerpt} rows={2} />
				</div>

				<div className={styles.formGroup}>
					<label>文章內容</label>
					<TiptapEditor content={contentJson} onChange={setContentJson} />
				</div>

				{/* SEO */}
				<div className={styles.formGroup}>
					<label>SEO 標題</label>
					<input name='seoTitle' defaultValue={post.seo?.title} />
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea name='seoDescription' defaultValue={post.seo?.description} rows={2} />
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '更新文章'}
					</button>
					<Link href='/admin/posts' className={styles.cancelBtn}>
						返回列表
					</Link>
				</div>
			</form>
		</div>
	);
}
