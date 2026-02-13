/**
 * 文章刪除按鈕（Client Component）
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostDeleteButton({ id, title }: { id: string; title: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		if (!confirm(`確定要刪除「${title}」嗎？此操作無法復原。`)) return;

		setLoading(true);
		try {
			const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
			const data = await res.json();
			if (data.success) {
				router.refresh();
			} else {
				alert('刪除失敗：' + (data.error || '未知錯誤'));
			}
		} catch {
			alert('刪除失敗，請檢查網路連線。');
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={loading}
			style={{
				padding: '0.25rem 0.625rem',
				borderRadius: '6px',
				border: '1px solid #fca5a5',
				background: 'transparent',
				color: '#dc2626',
				cursor: loading ? 'not-allowed' : 'pointer',
				fontSize: '0.8rem',
				opacity: loading ? 0.5 : 1,
			}}
		>
			{loading ? '刪除中...' : '刪除'}
		</button>
	);
}
