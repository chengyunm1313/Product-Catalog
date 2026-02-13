/**
 * Image Gallery Block
 */

import Image from 'next/image';
import type { ImageGalleryBlockData } from '@/types';
import styles from './ImageGalleryBlock.module.css';

interface ImageGalleryBlockProps {
	data: ImageGalleryBlockData;
}

export default function ImageGalleryBlock({ data }: ImageGalleryBlockProps) {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.grid}>
					{data.images.map((img, idx) => (
						<div key={idx} className={styles.imageWrapper}>
							<Image src={img.url} alt={img.alt} fill style={{ objectFit: 'cover' }} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
