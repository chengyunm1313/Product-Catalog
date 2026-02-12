/**
 * Rich Text Block
 * 渲染 Tiptap JSON 內容
 */

import type { RichTextBlockData } from '@/types';
import TiptapRenderer from '@/components/editor/TiptapRenderer';
import styles from './RichTextBlock.module.css';

interface RichTextBlockProps {
	data: RichTextBlockData;
}

export default function RichTextBlock({ data }: RichTextBlockProps) {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<TiptapRenderer content={data.contentJson} />
			</div>
		</section>
	);
}
