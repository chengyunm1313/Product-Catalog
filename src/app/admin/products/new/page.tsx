/**
 * 後台 — 新增產品
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../form.module.css';

export default function NewProductPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');

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
			seo: {
				title: form.get('seoTitle') || `${form.get('name')} — Brand`,
				description: form.get('seoDescription') || '',
			},
		};

		try {
			const res = await fetch('/api/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();

			if (data.success) {
				router.push('/admin/products');
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
			<h1>新增產品</h1>

			{error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>產品名稱 *</label>
						<input name='name' required placeholder='例如：專業級工業感測器' />
					</div>
					<div className={styles.formGroup}>
						<label>URL Slug *</label>
						<input name='slug' required placeholder='例如：industrial-sensor-pro' />
					</div>
				</div>

				<div className={styles.formRow3}>
					<div className={styles.formGroup}>
						<label>價格 (NT$)</label>
						<input name='price' type='number' min='0' placeholder='0' />
					</div>
					<div className={styles.formGroup}>
						<label>SKU</label>
						<input name='sku' placeholder='例如：SNR-PRO-100' />
					</div>
					<div className={styles.formGroup}>
						<label>狀態</label>
						<select name='status'>
							<option value='draft'>草稿</option>
							<option value='published'>發佈</option>
						</select>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>標籤（以逗號分隔）</label>
					<input name='tags' placeholder='例如：感測器, 工業級, 溫濕度' />
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
					<input name='seoTitle' placeholder='留空使用預設' />
				</div>
				<div className={styles.formGroup}>
					<label>SEO 描述</label>
					<textarea name='seoDescription' placeholder='產品的 meta description' rows={2} />
				</div>

				<div className={styles.formActions}>
					<button type='submit' className={styles.submitBtn} disabled={loading}>
						{loading ? '儲存中...' : '新增產品'}
					</button>
					<Link href='/admin/products' className={styles.cancelBtn}>
						取消
					</Link>
				</div>
			</form>
		</div>
	);
}
