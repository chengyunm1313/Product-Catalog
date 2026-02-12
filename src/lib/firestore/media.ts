/**
 * 媒體 Firestore 資料操作
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Media } from '@/types';

const COLLECTION = 'media';

/** 取得所有媒體 */
export async function getAllMedia(): Promise<Media[]> {
	const snapshot = await adminDb.collection(COLLECTION).orderBy('createdAt', 'desc').get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Media[];
}

/** 新增媒體記錄 */
export async function createMedia(data: Omit<Media, 'id'>): Promise<string> {
	const docRef = await adminDb.collection(COLLECTION).add(data);
	return docRef.id;
}

/** 刪除媒體記錄 */
export async function deleteMedia(id: string): Promise<void> {
	await adminDb.collection(COLLECTION).doc(id).delete();
}

/** 搜尋媒體 */
export async function searchMedia(query: string): Promise<Media[]> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.orderBy('filename')
		.startAt(query)
		.endAt(query + '\uf8ff')
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Media[];
}
