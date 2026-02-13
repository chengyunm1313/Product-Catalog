/**
 * Root Layout
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Brand — 產品型錄與品牌形象',
	description: '探索我們的精選產品、閱讀最新文章，了解品牌故事與專業服務。',
	openGraph: {
		title: 'Brand — 產品型錄與品牌形象',
		description: '探索我們的精選產品、閱讀最新文章，了解品牌故事與專業服務。',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='zh-TW'>
			<body>{children}</body>
		</html>
	);
}
