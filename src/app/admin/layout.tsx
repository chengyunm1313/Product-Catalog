/**
 * 後台 CMS Layout
 * 側邊欄 + 內容區
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	LayoutDashboard,
	Package,
	FileText,
	Layers,
	Image as ImageIcon,
	Settings,
	LogOut,
	Menu,
	X,
} from 'lucide-react';
import { useState } from 'react';
import styles from './admin.module.css';

const navItems = [
	{ href: '/admin', icon: LayoutDashboard, label: '儀表板' },
	{ href: '/admin/products', icon: Package, label: '產品管理' },
	{ href: '/admin/posts', icon: FileText, label: '文章管理' },
	{ href: '/admin/pages', icon: Layers, label: '頁面管理' },
	{ href: '/admin/media', icon: ImageIcon, label: '媒體庫' },
	{ href: '/admin/settings', icon: Settings, label: '系統設定' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className={styles.layout}>
			{/* 側邊欄 */}
			<aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
				<div className={styles.sidebarHeader}>
					<Link href='/admin' className={styles.logo}>
						<span className={styles.logoIcon}>B</span>
						<span className={styles.logoText}>Brand CMS</span>
					</Link>
					<button className={styles.closeSidebar} onClick={() => setSidebarOpen(false)}>
						<X size={20} />
					</button>
				</div>

				<nav className={styles.nav}>
					{navItems.map((item) => {
						const isActive =
							item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`${styles.navItem} ${isActive ? styles.active : ''}`}
								onClick={() => setSidebarOpen(false)}
							>
								<item.icon size={18} />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				<div className={styles.sidebarFooter}>
					<Link href='/' className={styles.navItem}>
						<LogOut size={18} />
						<span>返回前台</span>
					</Link>
				</div>
			</aside>

			{/* 行動裝置遮罩 */}
			{sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

			{/* 主要內容 */}
			<div className={styles.main}>
				<header className={styles.topbar}>
					<button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
						<Menu size={20} />
					</button>
					<div className={styles.userInfo}>
						<span className={styles.avatar}>A</span>
						<span className={styles.userName}>管理員</span>
					</div>
				</header>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
}
