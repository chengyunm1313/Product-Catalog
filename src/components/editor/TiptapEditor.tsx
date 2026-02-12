/**
 * Tiptap 編輯器（Client Component）
 */

'use client';

import { useEditor, EditorContent, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import {
	Bold,
	Italic,
	Heading1,
	Heading2,
	Heading3,
	Link as LinkIcon,
	Image as ImageIcon,
	List,
	ListOrdered,
	Undo,
	Redo,
} from 'lucide-react';

interface TiptapEditorProps {
	content: JSONContent | null;
	onChange: (json: JSONContent) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
			}),
			LinkExtension.configure({
				openOnClick: false,
			}),
			ImageExtension,
		],
		content: content || { type: 'doc', content: [{ type: 'paragraph' }] },
		onUpdate: ({ editor }) => {
			onChange(editor.getJSON());
		},
	});

	if (!editor) return null;

	/** 新增連結 */
	const setLink = () => {
		const url = prompt('請輸入連結 URL：');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	/** 新增圖片 */
	const addImage = () => {
		const url = prompt('請輸入圖片 URL：');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div className='tiptap-editor'>
			{/* 工具列 */}
			<div className='tiptap-toolbar'>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
					title='粗體'
					type='button'
				>
					<Bold size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
					title='斜體'
					type='button'
				>
					<Italic size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
					title='標題 1'
					type='button'
				>
					<Heading1 size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
					title='標題 2'
					type='button'
				>
					<Heading2 size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
					title='標題 3'
					type='button'
				>
					<Heading3 size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
					title='無序列表'
					type='button'
				>
					<List size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'is-active' : ''}
					title='有序列表'
					type='button'
				>
					<ListOrdered size={16} />
				</button>
				<button onClick={setLink} title='插入連結' type='button'>
					<LinkIcon size={16} />
				</button>
				<button onClick={addImage} title='插入圖片' type='button'>
					<ImageIcon size={16} />
				</button>
				<button onClick={() => editor.chain().focus().undo().run()} title='復原' type='button'>
					<Undo size={16} />
				</button>
				<button onClick={() => editor.chain().focus().redo().run()} title='重做' type='button'>
					<Redo size={16} />
				</button>
			</div>

			{/* 編輯區 */}
			<EditorContent editor={editor} className='tiptap-content' />
		</div>
	);
}
