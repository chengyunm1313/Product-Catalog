/**
 * 產品編輯表單（Client Component）
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import type { Product } from '@/types';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from '../../form.module.css';

interface Props {
	product: Product;
}

export default function ProductEditForm({ product }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
		Object.entries(product.specs || {}).map(([key, value]) => ({ key, value }))
	);
	const [descriptionJson, setDescriptionJson] = useState<JSONContent>(
		product.descriptionJson || { type: 'doc', content: [{ type: 'paragraph' }] }
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		const form = new FormData(e.currentTarget);

		const specsObj: Record<string, string> = {};
		specs.forEach((s) => {
			if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
		});

		const body = {
			name: form.get('name'),
			slug: form.get('slug'),
			price: Number(form.get('price')) || 0,
			sku: form.get('sku'),
			status: form.get('status'),
			tags:
				(form.get('tags') as string)
					?.split(',')
					.map((t) => t.trim())
					.filter(Boolean) || [],
			specs: specsObj,
			descriptionJson,
			seo: {
				title: form.get('seoTitle') || '',
				description: form.get('seoDescription') || '',
			},
		};

		try {
			const res = await fetch(`/api/products/${product.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				setMessage('產品已更新');
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
			<h1>編輯產品：{product.name}</h1>

			{message && <div className={`${styles.alert} ${styles.alertSuccess}`}>{message}</div>}
			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>產品名稱 *</label>
						<input name='name' required defaultValue={product.name} />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required defaultValue={product.slug} />
					</div>
				</div>

				<div className={styles.formRow3}>
					<div className={styles.formGroup}>
						<label>價格 (NT$)</label>
						<input name='price' type='number' min='0' defaultValue={product.price} />
					</div>
					<div className={styles.formGroup}>
						<label>SKU</label>
						<input name='sku' defaultValue={product.sku} />
					</div>
					<div className={styles.formGroup}>
						<label>狀態</label>
						<select name='status' defaultValue={product.status}>
							<option value='draft'>草稿</option>
							<option value='published'>發佈</option>
						</select>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>標籤（以逗號分隔）</label>
					<input name='tags' defaultValue={product.tags?.join(', ')} />
				</div>

				<div className={styles.formGroup}>
					<label>產品描述</label>
					<TiptapEditor content={descriptionJson} onChange={setDescriptionJson} />
				</div>

				{/* 產品規格 */}
				<div className={styles.formGroup}>
					<label>產品規格</label>
					{specs.map((spec, i) => (
						<div key={i} className={styles.specRow}>
							<input
								placeholder='規格名稱'
								value={spec.key}
								onChange={(e) => {
									const next = [...specs];
									next[i] = { ...next[i], key: e.target.value };
									setSpecs(next);
								}}
							/>
							<input
								placeholder='規格值'
								value={spec.value}
								onChange={(e) => {
									const next = [...specs];
									next[i] = { ...next[i], value: e.target.value };
									setSpecs(next);
								}}
							/>
							<button
								type='button'
								className={styles.removeBtn}
								onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
							>
								✕
							</button>
						</div>
					))}
					<button
						type='button'
						className={styles.addBtn}
						onClick={() => setSpecs([...specs, { key: '', value: '' }])}
					>
						＋ 新增規格
					</button>
				</div>

				{/* SEO */}
				<div className={styles.formGroup}>
					<label>SEO 標題</label>
					<input name='seoTitle' defaultValue={product.seo?.title} />
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea name='seoDescription' defaultValue={product.seo?.description} rows={2} />
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '更新產品'}
					</button>
					<Link href='/admin/products' className={styles.cancelBtn}>
						返回列表
					</Link>
				</div>
			</form>
		</div>
	);
}
