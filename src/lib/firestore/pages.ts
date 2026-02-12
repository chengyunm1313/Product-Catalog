/**
 * 頁面 Firestore 資料操作
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Page } from '@/types';

const COLLECTION = 'pages';

/** 根據 slug 取得頁面 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.where('slug', '==', slug)
		.where('status', '==', 'published')
		.limit(1)
		.get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() } as Page;
}

/** 取得所有頁面（後台用） */
export async function getAllPages(): Promise<Page[]> {
	const snapshot = await adminDb.collection(COLLECTION).orderBy('updatedAt', 'desc').get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Page[];
}

/** 根據 ID 取得頁面（後台用） */
export async function getPageById(id: string): Promise<Page | null> {
	const doc = await adminDb.collection(COLLECTION).doc(id).get();
	if (!doc.exists) return null;
	return { id: doc.id, ...doc.data() } as Page;
}

/** 新增頁面 */
export async function createPage(
	data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
	const now = new Date().toISOString();
	const docRef = await adminDb.collection(COLLECTION).add({
		...data,
		createdAt: now,
		updatedAt: now,
	});
	return docRef.id;
}

/** 更新頁面 */
export async function updatePage(id: string, data: Partial<Page>): Promise<void> {
	await adminDb
		.collection(COLLECTION)
		.doc(id)
		.update({
			...data,
			updatedAt: new Date().toISOString(),
		});
}

/** 刪除頁面 */
export async function deletePage(id: string): Promise<void> {
	await adminDb.collection(COLLECTION).doc(id).delete();
}
