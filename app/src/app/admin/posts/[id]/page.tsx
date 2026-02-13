/**
 * 後台 — 編輯文章
 * Server Component 取得既有資料，傳入 Client Form
 */

import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/firestore/posts';
import PostEditForm from './PostEditForm';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
	const { id } = await params;
	const post = await getPostById(id);

	if (!post) {
		notFound();
	}

	return <PostEditForm post={post} />;
}
