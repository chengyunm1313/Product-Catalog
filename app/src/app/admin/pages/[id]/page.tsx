/**
 * 後台 — 編輯頁面
 * Server Component 取得既有資料，傳入 Client Form
 */

import { notFound } from 'next/navigation';
import { getPageById } from '@/lib/firestore/pages';
import PageEditForm from './PageEditForm';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditPagePage({ params }: Props) {
	const { id } = await params;
	const page = await getPageById(id);

	if (!page) {
		notFound();
	}

	return <PageEditForm page={page} />;
}
