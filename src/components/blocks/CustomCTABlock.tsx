/**
 * Custom CTA Block
 * 自訂呼籲行動區塊
 */

import Link from 'next/link';
import type { CustomCTABlockData } from '@/types';
import styles from './CustomCTABlock.module.css';

interface CustomCTABlockProps {
	data: CustomCTABlockData;
}

export default function CustomCTABlock({ data }: CustomCTABlockProps) {
	return (
		<section
			className={styles.section}
			style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})` } : undefined}
		>
			<div className={styles.overlay} />
			<div className={styles.content}>
				<h2 className={styles.title}>{data.title}</h2>
				<p className={styles.description}>{data.description}</p>
				{data.buttonText && (
					<Link href={data.buttonLink || '#'} className={styles.cta}>
						{data.buttonText}
					</Link>
				)}
			</div>
		</section>
	);
}
