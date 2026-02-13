/**
 * Block 渲染器
 * 根據 block type 動態渲染對應元件
 */

import type { BlockData } from '@/types';
import HeroBlock from './HeroBlock';
import RichTextBlock from './RichTextBlock';
import ProductGridBlock from './ProductGridBlock';
import BlogListBlock from './BlogListBlock';
import ImageGalleryBlock from './ImageGalleryBlock';
import CustomCTABlock from './CustomCTABlock';

interface BlockRendererProps {
	blocks: BlockData[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
	return (
		<>
			{blocks.map((block, index) => {
				switch (block.type) {
					case 'hero':
						return <HeroBlock key={index} data={block.data} />;
					case 'richText':
						return <RichTextBlock key={index} data={block.data} />;
					case 'productGrid':
						return <ProductGridBlock key={index} data={block.data} />;
					case 'blogList':
						return <BlogListBlock key={index} data={block.data} />;
					case 'imageGallery':
						return <ImageGalleryBlock key={index} data={block.data} />;
					case 'customCTA':
						return <CustomCTABlock key={index} data={block.data} />;
					default:
						return null;
				}
			})}
		</>
	);
}
