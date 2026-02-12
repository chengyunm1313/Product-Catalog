/**
 * 後台 — 新增頁面
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from '../../form.module.css';

export default function NewPagePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [contentJson, setContentJson] = useState<JSONContent>({
		type: 'doc',
		content: [{ type: 'paragraph' }],
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		const form = new FormData(e.currentTarget);

		const body = {
			title: form.get('title'),
			slug: form.get('slug'),
			status: form.get('status'),
			blocks: [
				{
					type: 'richText',
					data: { contentJson },
				},
			],
			seo: {
				title: form.get('seoTitle') || `${form.get('title')}`,
				description: form.get('seoDescription') || '',
			},
		};

		try {
			const res = await fetch('/api/pages', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				router.push('/admin/pages');
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
			<h1>新增頁面</h1>

			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>頁面標題 *</label>
						<input name='title' required placeholder='例如：關於我們' />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required placeholder='例如：about-us' />
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>狀態</label>
					<select name='status'>
						<option value='draft'>草稿</option>
						<option value='published'>發佈</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>頁面內容</label>
					<TiptapEditor content={contentJson} onChange={setContentJson} />
				</div>

				{/* SEO */}
				<div className={styles.formGroup}>
					<label>SEO 標題</label>
					<input name='seoTitle' placeholder='留空使用頁面標題' />
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea name='seoDescription' placeholder='頁面的 meta description' rows={2} />
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '新增頁面'}
					</button>
					<Link href='/admin/pages' className={styles.cancelBtn}>
						取消
					</Link>
				</div>
			</form>
		</div>
	);
}
