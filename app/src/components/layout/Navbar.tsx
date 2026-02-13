/**
 * 前台導航列
 * 動態載入後台已發佈頁面至選單
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import styles from './Navbar.module.css';

/** 固定導航項目 */
const staticLinks = [
	{ href: '/', label: '首頁' },
	{ href: '/products', label: '產品' },
	{ href: '/blog', label: '部落格' },
	{ href: '/about', label: '關於我們' },
];

interface NavPage {
	slug: string;
	title: string;
}

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [dynamicPages, setDynamicPages] = useState<NavPage[]>([]);

	// 載入後台已發佈的動態頁面
	useEffect(() => {
		async function fetchNavPages() {
			try {
				const res = await fetch('/api/pages/nav');
				const data = await res.json();
				if (data.success && Array.isArray(data.items)) {
					setDynamicPages(data.items);
				}
			} catch {
				// 靜默失敗，僅顯示靜態連結
			}
		}
		fetchNavPages();
	}, []);

	// 合併靜態 + 動態連結
	const allLinks = [
		...staticLinks,
		...dynamicPages.map((p) => ({
			href: `/${p.slug}`,
			label: p.title,
		})),
	];

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link href='/' className={styles.logo}>
					<span className={styles.logoIcon}>◆</span>
					<span className={styles.logoText}>Brand</span>
				</Link>

				{/* 桌面導航 */}
				<ul className={styles.desktopMenu}>
					{allLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<div className={styles.actions}>
					<button
						className={styles.iconBtn}
						onClick={() => setSearchOpen(!searchOpen)}
						aria-label='搜尋'
					>
						<Search size={20} />
					</button>
					<button
						className={styles.menuBtn}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label='選單'
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			{/* 搜尋列 */}
			{searchOpen && (
				<div className={styles.searchBar}>
					<div className={styles.searchContainer}>
						<Search size={18} className={styles.searchIcon} />
						<input
							type='text'
							placeholder='搜尋產品或文章...'
							className={styles.searchInput}
							autoFocus
						/>
					</div>
				</div>
			)}

			{/* 手機選單 */}
			{mobileMenuOpen && (
				<div className={styles.mobileMenu}>
					<ul>
						{allLinks.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</header>
	);
}
