/**
 * Hero Block
 * 首頁主視覺區塊
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { HeroBlockData } from '@/types';
import styles from './HeroBlock.module.css';

interface HeroBlockProps {
	data: HeroBlockData;
}

export default function HeroBlock({ data }: HeroBlockProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { title, subtitle, images, buttonText, buttonLink } = data;

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % (images.length || 1));
	}, [images.length]);

	useEffect(() => {
		if (images.length <= 1) return;
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, [images.length, nextSlide]);

	return (
		<section className={styles.hero}>
			{/* 背景輪播 */}
			<div className={styles.slideshow}>
				{images.length > 0 ? (
					images.map((img, idx) => (
						<div
							key={idx}
							className={`${styles.slide} ${idx === currentSlide ? styles.slideActive : ''}`}
						>
							<Image
								src={img}
								alt={`${title} - ${idx + 1}`}
								fill
								style={{ objectFit: 'cover' }}
								priority={idx === 0}
							/>
						</div>
					))
				) : (
					<div className={`${styles.slide} ${styles.slideActive} ${styles.placeholder}`} />
				)}
				<div className={styles.overlay} />
			</div>

			{/* 文字內容 */}
			<div className={styles.content}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				{buttonText && (
					<Link href={buttonLink || '#'} className={styles.cta}>
						{buttonText}
					</Link>
				)}
			</div>

			{/* 輪播指示器 */}
			{images.length > 1 && (
				<div className={styles.dots}>
					{images.map((_, idx) => (
						<button
							key={idx}
							className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
							onClick={() => setCurrentSlide(idx)}
							aria-label={`前往第 ${idx + 1} 張圖片`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
