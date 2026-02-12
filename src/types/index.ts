// ========================================
// 型別定義
// ========================================

import type { JSONContent } from '@tiptap/react';

/** SEO 欄位 */
export interface SeoMeta {
	title: string;
	description: string;
	ogImage?: string;
}

/** 文章 */
export interface Post {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	status: 'draft' | 'published';
	contentJson: JSONContent | null;
	seo: SeoMeta;
	coverImage: string;
	tags: string[];
	author: string;
	createdAt: string;
	updatedAt: string;
}

/** 產品 */
export interface Product {
	id: string;
	slug: string;
	name: string;
	descriptionJson: JSONContent | null;
	price: number;
	sku: string;
	status: 'draft' | 'published';
	images: string[];
	categoryIds: string[];
	tags: string[];
	specs: Record<string, string>;
	seo: SeoMeta;
	createdAt: string;
	updatedAt: string;
}

/** 產品分類 */
export interface Category {
	id: string;
	name: string;
	slug: string;
	parentId?: string;
}

/** 標籤 */
export interface Tag {
	id: string;
	name: string;
	slug: string;
}

/** Block 類型 */
export type BlockType =
	| 'hero'
	| 'richText'
	| 'productGrid'
	| 'blogList'
	| 'imageGallery'
	| 'customCTA';

/** Hero Block 資料 */
export interface HeroBlockData {
	title: string;
	subtitle: string;
	images: string[];
	buttonText: string;
	buttonLink: string;
}

/** Rich Text Block 資料 */
export interface RichTextBlockData {
	contentJson: JSONContent;
}

/** Product Grid Block 資料 */
export interface ProductGridBlockData {
	title: string;
	productIds: string[];
	limit: number;
}

/** Blog List Block 資料 */
export interface BlogListBlockData {
	title: string;
	limit: number;
}

/** Image Gallery Block 資料 */
export interface ImageGalleryBlockData {
	images: { url: string; alt: string }[];
}

/** Custom CTA Block 資料 */
export interface CustomCTABlockData {
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
	backgroundImage?: string;
}

/** Block 聯合型別 */
export type BlockData =
	| { type: 'hero'; data: HeroBlockData }
	| { type: 'richText'; data: RichTextBlockData }
	| { type: 'productGrid'; data: ProductGridBlockData }
	| { type: 'blogList'; data: BlogListBlockData }
	| { type: 'imageGallery'; data: ImageGalleryBlockData }
	| { type: 'customCTA'; data: CustomCTABlockData };

/** 頁面 */
export interface Page {
	id: string;
	slug: string;
	title: string;
	blocks: BlockData[];
	status: 'draft' | 'published';
	seo: SeoMeta;
	createdAt: string;
	updatedAt: string;
}

/** 媒體 */
export interface Media {
	id: string;
	url: string;
	path: string;
	filename: string;
	contentType: string;
	size: number;
	createdAt: string;
	createdBy: string;
}

/** 使用者角色 */
export type UserRole = 'admin' | 'editor' | 'viewer';

/** 使用者 */
export interface AppUser {
	uid: string;
	email: string;
	displayName: string;
	role: UserRole;
	createdAt: string;
}

/** API 回應 */
export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
}

/** 分頁參數 */
export interface PaginationParams {
	page: number;
	limit: number;
}

/** 分頁回應 */
export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
