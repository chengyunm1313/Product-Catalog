/**
 * 文章 Firestore 資料操作
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Post, PaginatedResponse } from '@/types';

const COLLECTION = 'posts';

/** 取得所有已發布文章 */
export async function getPublishedPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.where('status', '==', 'published')
		.orderBy('createdAt', 'desc')
		.get();

	const total = snapshot.size;
	const allPosts = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Post[];

	const start = (page - 1) * limit;
	const items = allPosts.slice(start, start + limit);

	return {
		items,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
}

/** 根據 slug 取得單篇文章 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.where('slug', '==', slug)
		.where('status', '==', 'published')
		.limit(1)
		.get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() } as Post;
}

/** 取得所有文章（含草稿，後台用） */
export async function getAllPosts(): Promise<Post[]> {
	const snapshot = await adminDb.collection(COLLECTION).orderBy('updatedAt', 'desc').get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Post[];
}

/** 取得單篇文章（後台用） */
export async function getPostById(id: string): Promise<Post | null> {
	const doc = await adminDb.collection(COLLECTION).doc(id).get();
	if (!doc.exists) return null;
	return { id: doc.id, ...doc.data() } as Post;
}

/** 新增文章 */
export async function createPost(
	data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
	const now = new Date().toISOString();
	const docRef = await adminDb.collection(COLLECTION).add({
		...data,
		createdAt: now,
		updatedAt: now,
	});
	return docRef.id;
}

/** 更新文章 */
export async function updatePost(id: string, data: Partial<Post>): Promise<void> {
	await adminDb
		.collection(COLLECTION)
		.doc(id)
		.update({
			...data,
			updatedAt: new Date().toISOString(),
		});
}

/** 刪除文章 */
export async function deletePost(id: string): Promise<void> {
	await adminDb.collection(COLLECTION).doc(id).delete();
}

/** 搜尋文章 */
export async function searchPosts(query: string): Promise<Post[]> {
	// Firestore 不支援全文搜尋，這裡用 title 前綴匹配
	const snapshot = await adminDb
		.collection(COLLECTION)
		.orderBy('title')
		.startAt(query)
		.endAt(query + '\uf8ff')
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Post[];
}
