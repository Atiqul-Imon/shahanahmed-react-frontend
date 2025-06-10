import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Strike from '@tiptap/extension-strike';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);
  if (!editor) return null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border-b bg-white shadow-sm">
      {/* Basic formatting */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`btn ${editor.isActive('bold') && 'btn-active'}`}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`btn ${editor.isActive('italic') && 'btn-active'}`}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`btn ${editor.isActive('underline') && 'btn-active'}`}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`btn ${editor.isActive('strike') && 'btn-active'}`}>Strike</button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`btn ${editor.isActive('highlight') && 'btn-active'}`}>Highlight</button>

      {/* Headings */}
      <select
        value={editor.getAttributes('heading').level || ''}
        onChange={(e) => {
          const level = parseInt(e.target.value);
          level ? editor.chain().focus().toggleHeading({ level }).run() : editor.chain().focus().setParagraph().run();
        }}
        className="px-2 py-1 border rounded"
      >
        <option value="">Normal</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
      </select>

      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`btn ${editor.isActive('bulletList') && 'btn-active'}`}>• List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`btn ${editor.isActive('orderedList') && 'btn-active'}`}>1. List</button>

      {/* Block elements */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`btn ${editor.isActive('blockquote') && 'btn-active'}`}>Quote</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`btn ${editor.isActive('codeBlock') && 'btn-active'}`}>Code</button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn">HR</button>

      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="btn">Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="btn">Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="btn">Right</button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className="btn">Justify</button>

      {/* Clear formatting */}
      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="btn">Clear</button>

      {/* Undo / Redo */}
      <button onClick={() => editor.chain().focus().undo().run()} className="btn">Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()} className="btn">Redo</button>

      {/* Image Upload */}
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
      <button onClick={() => fileInputRef.current.click()} className="btn">Image</button>
    </div>
  );
};

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Strike,
      Highlight,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList.configure({ HTMLAttributes: { class: 'list-disc pl-4' } }),
      OrderedList.configure({ HTMLAttributes: { class: 'list-decimal pl-4' } }),
      Image.configure({ HTMLAttributes: { class: 'my-4 max-w-full' } }),
      CodeBlock,
      Blockquote,
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-4 min-h-[300px]',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  return (
    <div className="border shadow rounded">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
