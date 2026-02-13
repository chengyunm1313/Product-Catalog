/**
 * 產品 Firestore 資料操作
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Product, PaginatedResponse } from '@/types';

const COLLECTION = 'products';

/** 取得已發布產品（支援分類篩選） */
export async function getPublishedProducts(
	page = 1,
	limit = 12,
	categoryId?: string
): Promise<PaginatedResponse<Product>> {
	let query = adminDb.collection(COLLECTION).where('status', '==', 'published');

	if (categoryId) {
		query = query.where('categoryIds', 'array-contains', categoryId);
	}

	const snapshot = await query.orderBy('createdAt', 'desc').get();

	const total = snapshot.size;
	const allProducts = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Product[];

	const start = (page - 1) * limit;
	const items = allProducts.slice(start, start + limit);

	return {
		items,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
}

/** 根據 slug 取得單一產品 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.where('slug', '==', slug)
		.where('status', '==', 'published')
		.limit(1)
		.get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() } as Product;
}

/** 取得所有產品（後台用） */
export async function getAllProducts(): Promise<Product[]> {
	const snapshot = await adminDb.collection(COLLECTION).orderBy('updatedAt', 'desc').get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Product[];
}

/** 根據 ID 取得產品（後台用） */
export async function getProductById(id: string): Promise<Product | null> {
	const doc = await adminDb.collection(COLLECTION).doc(id).get();
	if (!doc.exists) return null;
	return { id: doc.id, ...doc.data() } as Product;
}

/** 根據多個 ID 取得產品 */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
	if (ids.length === 0) return [];

	// Firestore in 查詢最多 30 筆
	const chunks = [];
	for (let i = 0; i < ids.length; i += 30) {
		chunks.push(ids.slice(i, i + 30));
	}

	const results: Product[] = [];
	for (const chunk of chunks) {
		const snapshot = await adminDb.collection(COLLECTION).where('__name__', 'in', chunk).get();

		results.push(
			...(snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Product[])
		);
	}

	return results;
}

/** 新增產品 */
export async function createProduct(
	data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
	const now = new Date().toISOString();
	const docRef = await adminDb.collection(COLLECTION).add({
		...data,
		createdAt: now,
		updatedAt: now,
	});
	return docRef.id;
}

/** 更新產品 */
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
	await adminDb
		.collection(COLLECTION)
		.doc(id)
		.update({
			...data,
			updatedAt: new Date().toISOString(),
		});
}

/** 刪除產品 */
export async function deleteProduct(id: string): Promise<void> {
	await adminDb.collection(COLLECTION).doc(id).delete();
}

/** 搜尋產品 */
export async function searchProducts(query: string): Promise<Product[]> {
	const snapshot = await adminDb
		.collection(COLLECTION)
		.orderBy('name')
		.startAt(query)
		.endAt(query + '\uf8ff')
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Product[];
}
