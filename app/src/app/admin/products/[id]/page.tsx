/**
 * 後台 — 編輯產品
 * Server Component 取得既有資料，傳入 Client Form
 */

import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/firestore/products';
import ProductEditForm from './ProductEditForm';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
	const { id } = await params;
	const product = await getProductById(id);

	if (!product) {
		notFound();
	}

	return <ProductEditForm product={product} />;
}
