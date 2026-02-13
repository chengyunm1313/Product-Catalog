/**
 * 關於我們頁面
 */

import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
	title: '關於我們 — Brand',
	description: '了解我們的品牌故事、核心價值與團隊使命。',
};

const values = [
	{
		icon: '🎯',
		title: '品質至上',
		desc: '每一件產品都經過嚴格品管流程，確保達到國際標準。',
	},
	{
		icon: '🔬',
		title: '技術創新',
		desc: '持續投入研發，以最先進的技術打造卓越產品。',
	},
	{
		icon: '🤝',
		title: '客戶導向',
		desc: '深入了解客戶需求，提供量身訂做的解決方案。',
	},
	{
		icon: '🌍',
		title: '永續經營',
		desc: '在追求卓越的同時，兼顧環境保護與社會責任。',
	},
];

const milestones = [
	{ year: '2010', event: '公司成立，專注於精密量測領域' },
	{ year: '2013', event: '推出第一代工業感測器系列' },
	{ year: '2016', event: '取得 ISO 9001 國際品質認證' },
	{ year: '2019', event: '智慧製造解決方案上市' },
	{ year: '2022', event: '全球合作夥伴突破 200 家' },
	{ year: '2024', event: '新世代自動化平台發布' },
];

export default function AboutPage() {
	return (
		<section className={styles.page}>
			{/* Hero 區塊 */}
			<div className={styles.hero}>
				<div className='container'>
					<h1>關於我們</h1>
					<p>
						以技術創新驅動產業進步，
						<br />
						我們致力於成為您最可靠的合作夥伴。
					</p>
				</div>
			</div>

			{/* 品牌故事 */}
			<div className={styles.story}>
				<div className='container'>
					<div className={styles.storyContent}>
						<h2>品牌故事</h2>
						<p>
							自 2010 年成立以來，我們始終秉持「品質、創新、服務」的核心理念，
							深耕工業自動化與精密量測領域。從一間小型研發工作室起步， 如今已成長為服務全球 200
							多家企業的專業解決方案提供商。
						</p>
						<p>
							我們相信，唯有不斷突破技術邊界、深入理解客戶需求，
							才能在瞬息萬變的市場中保持領先。每一項產品的誕生， 都凝聚了團隊對卓越品質的不懈追求。
						</p>
					</div>
				</div>
			</div>

			{/* 核心價值 */}
			<div className={styles.values}>
				<div className='container'>
					<h2>核心價值</h2>
					<div className={styles.valuesGrid}>
						{values.map((v) => (
							<div key={v.title} className={styles.valueCard}>
								<span className={styles.valueIcon}>{v.icon}</span>
								<h3>{v.title}</h3>
								<p>{v.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 里程碑 */}
			<div className={styles.milestones}>
				<div className='container'>
					<h2>發展歷程</h2>
					<div className={styles.timeline}>
						{milestones.map((m) => (
							<div key={m.year} className={styles.milestone}>
								<div className={styles.year}>{m.year}</div>
								<div className={styles.line} />
								<div className={styles.event}>{m.event}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
