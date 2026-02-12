/**
 * Tiptap 富文本編輯器（Client Component）
 *
 * 支援格式：粗體、斜體、刪除線、行內程式碼、
 * 標題 H1-H3、無序/有序列表、引言、分隔線、連結、圖片
 * 底部顯示即時字數統計
 */

'use client';

import { useEditor, EditorContent, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import {
	Bold,
	Italic,
	Strikethrough,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Link as LinkIcon,
	Image as ImageIcon,
	List,
	ListOrdered,
	Quote,
	Minus,
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
		immediatelyRender: false,
	});

	if (!editor) return null;

	/** 新增連結 */
	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const url = prompt('請輸入連結 URL：', previousUrl || 'https://');
		if (url === null) return; // 取消
		if (url === '') {
			editor.chain().focus().unsetLink().run();
			return;
		}
		editor.chain().focus().setLink({ href: url }).run();
	};

	/** 新增圖片 */
	const addImage = () => {
		const url = prompt('請輸入圖片 URL：');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	/** 字數統計 */
	const text = editor.getText();
	const charCount = text.length;
	const wordCount = text
		.trim()
		.split(/\s+/)
		.filter((w) => w.length > 0).length;

	return (
		<div className='tiptap-editor'>
			{/* 工具列 */}
			<div className='tiptap-toolbar'>
				{/* 文字格式 */}
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
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'is-active' : ''}
					title='刪除線'
					type='button'
				>
					<Strikethrough size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={editor.isActive('code') ? 'is-active' : ''}
					title='行內程式碼'
					type='button'
				>
					<Code size={16} />
				</button>

				<span className='tiptap-toolbar-divider' />

				{/* 標題 */}
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

				<span className='tiptap-toolbar-divider' />

				{/* 列表與區塊 */}
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
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
					title='引言'
					type='button'
				>
					<Quote size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					title='分隔線'
					type='button'
				>
					<Minus size={16} />
				</button>

				<span className='tiptap-toolbar-divider' />

				{/* 插入 */}
				<button onClick={setLink} title='插入連結' type='button'>
					<LinkIcon size={16} />
				</button>
				<button onClick={addImage} title='插入圖片' type='button'>
					<ImageIcon size={16} />
				</button>

				<span className='tiptap-toolbar-divider' />

				{/* 歷史 */}
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					title='復原'
					type='button'
				>
					<Undo size={16} />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					title='重做'
					type='button'
				>
					<Redo size={16} />
				</button>
			</div>

			{/* 編輯區 */}
			<EditorContent editor={editor} className='tiptap-content' />

			{/* 字數統計 */}
			<div className='tiptap-footer'>
				<span>{charCount} 字元</span>
				<span>{wordCount} 詞</span>
			</div>
		</div>
	);
}
