/**
 * 後台 — 新增文章
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../form.module.css';

export default function NewPostPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');

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
			contentJson: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: form.get('content') || '（請編輯內容）' }],
					},
				],
			},
			seo: {
				title: form.get('seoTitle') || `${form.get('title')} — Blog`,
				description: form.get('seoDescription') || form.get('excerpt') || '',
			},
		};

		try {
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				router.push('/admin/posts');
				router.refresh();
			} else {
				setError(data.error || '新增失敗');
			}
		} catch {
			setError('新增失敗，請檢查網路連線。');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.formPage}>
			<h1>新增文章</h1>

			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>文章標題 *</label>
						<input name='title' required placeholder='例如：產品應用技術文' />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required placeholder='例如：tech-application-guide' />
					</div>
				</div>

				<div className={styles.formRow3}>
					<div className={styles.formGroup}>
						<label>作者</label>
						<input name='author' placeholder='例如：編輯部' />
					</div>
					<div className={styles.formGroup}>
						<label>狀態</label>
						<select name='status'>
							<option value='draft'>草稿</option>
							<option value='published'>發佈</option>
						</select>
					</div>
					<div className={styles.formGroup}>
						<label>標籤（以逗號分隔）</label>
						<input name='tags' placeholder='例如：技術, 應用, 教學' />
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>摘要</label>
					<textarea name='excerpt' placeholder='文章摘要（顯示在列表中）' rows={2} />
				</div>

				<div className={styles.formGroup}>
					<label>文章內容</label>
					<textarea
						name='content'
						placeholder='輸入文章內容（純文字，未來將整合 Tiptap 編輯器）'
						rows={8}
					/>
				</div>

				{/* SEO */}
				<div className={styles.formGroup}>
					<label>SEO 標題</label>
					<input name='seoTitle' placeholder='留空使用預設' />
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea name='seoDescription' placeholder='文章的 meta description' rows={2} />
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '新增文章'}
					</button>
					<Link href='/admin/posts' className={styles.cancelBtn}>
						取消
					</Link>
				</div>
			</form>
		</div>
	);
}
