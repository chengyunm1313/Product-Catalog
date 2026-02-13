/**
 * 後台 — 編輯頁面表單（Client Component）
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import TiptapEditor from '@/components/editor/TiptapEditor';
import type { Page } from '@/types';
import styles from '../../form.module.css';

/** 從 blocks 陣列中取得 richText 的 contentJson */
function extractContentFromBlocks(blocks: Page['blocks']): JSONContent {
	if (!blocks || blocks.length === 0) {
		return { type: 'doc', content: [{ type: 'paragraph' }] };
	}

	const richTextBlock = blocks.find((b) => b.type === 'richText');
	if (richTextBlock && 'contentJson' in richTextBlock.data) {
		return richTextBlock.data.contentJson as JSONContent;
	}

	return { type: 'doc', content: [{ type: 'paragraph' }] };
}

export default function PageEditForm({ page }: { page: Page }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [contentJson, setContentJson] = useState<JSONContent>(
		extractContentFromBlocks(page.blocks)
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

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
			const res = await fetch(`/api/pages/${page.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				setSuccess('頁面已更新');
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
			<h1>編輯頁面</h1>

			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}
			{success && <div className={`${styles.alert} ${styles.alertSuccess}`}>{success}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>頁面標題 *</label>
						<input name='title' required defaultValue={page.title} />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required defaultValue={page.slug} />
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>狀態</label>
					<select name='status' defaultValue={page.status}>
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
					<input
						name='seoTitle'
						defaultValue={page.seo?.title || ''}
						placeholder='留空使用頁面標題'
					/>
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea
						name='seoDescription'
						defaultValue={page.seo?.description || ''}
						placeholder='頁面的 meta description'
						rows={2}
					/>
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '更新頁面'}
					</button>
					<Link href='/admin/pages' className={styles.cancelBtn}>
						取消
					</Link>
				</div>
			</form>
		</div>
	);
}
