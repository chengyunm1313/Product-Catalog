/**
 * Tiptap JSON 內容渲染器（Server Component）
 * 將 Tiptap JSON 轉為 HTML 顯示
 */

import React from 'react';
import type { JSONContent } from '@tiptap/react';

interface TiptapRendererProps {
	content: JSONContent | null;
}

/** 將 Tiptap JSONContent 遞迴轉為 React 元素 */
function renderNode(node: JSONContent, index: number): React.ReactNode {
	if (node.type === 'text') {
		let text: React.ReactNode = node.text || '';
		if (node.marks) {
			for (const mark of node.marks) {
				switch (mark.type) {
					case 'bold':
						text = <strong key={`bold-${index}`}>{text}</strong>;
						break;
					case 'italic':
						text = <em key={`italic-${index}`}>{text}</em>;
						break;
					case 'link':
						text = (
							<a
								key={`link-${index}`}
								href={mark.attrs?.href}
								target='_blank'
								rel='noopener noreferrer'
							>
								{text}
							</a>
						);
						break;
				}
			}
		}
		return text;
	}

	const children = node.content?.map((child, i) => renderNode(child, i));

	switch (node.type) {
		case 'doc':
			return <>{children}</>;
		case 'paragraph':
			return <p key={index}>{children}</p>;
		case 'heading': {
			const level = node.attrs?.level || 2;
			return React.createElement(`h${level}`, { key: index }, children);
		}
		case 'bulletList':
			return <ul key={index}>{children}</ul>;
		case 'orderedList':
			return <ol key={index}>{children}</ol>;
		case 'listItem':
			return <li key={index}>{children}</li>;
		case 'image':
			return (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					key={index}
					src={node.attrs?.src}
					alt={node.attrs?.alt || ''}
					style={{ maxWidth: '100%', borderRadius: '8px' }}
				/>
			);
		default:
			return <div key={index}>{children}</div>;
	}
}

export default function TiptapRenderer({ content }: TiptapRendererProps) {
	if (!content) {
		return <p style={{ color: 'var(--color-text-secondary)' }}>尚無內容</p>;
	}

	return <div className='tiptap-content'>{renderNode(content, 0)}</div>;
}
