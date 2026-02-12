/**
 * 前台頁尾
 */

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.grid}>
					{/* 品牌介紹 */}
					<div className={styles.brand}>
						<div className={styles.logo}>
							<span className={styles.logoIcon}>◆</span>
							<span className={styles.logoText}>Brand</span>
						</div>
						<p className={styles.description}>提供高品質的產品與服務，致力於為客戶創造最佳體驗。</p>
					</div>

					{/* 快速連結 */}
					<div className={styles.linkGroup}>
						<h4 className={styles.groupTitle}>快速連結</h4>
						<ul>
							<li>
								<Link href='/'>首頁</Link>
							</li>
							<li>
								<Link href='/products'>產品</Link>
							</li>
							<li>
								<Link href='/blog'>部落格</Link>
							</li>
							<li>
								<Link href='/about'>關於我們</Link>
							</li>
						</ul>
					</div>

					{/* 服務 */}
					<div className={styles.linkGroup}>
						<h4 className={styles.groupTitle}>服務</h4>
						<ul>
							<li>
								<Link href='/services'>服務介紹</Link>
							</li>
							<li>
								<Link href='/contact'>聯絡我們</Link>
							</li>
							<li>
								<Link href='/faq'>常見問題</Link>
							</li>
						</ul>
					</div>

					{/* 聯絡資訊 */}
					<div className={styles.linkGroup}>
						<h4 className={styles.groupTitle}>聯絡我們</h4>
						<ul>
							<li>contact@brand.com</li>
							<li>+886-2-1234-5678</li>
							<li>台北市信義區</li>
						</ul>
					</div>
				</div>

				<div className={styles.bottom}>
					<p>© {currentYear} Brand. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
