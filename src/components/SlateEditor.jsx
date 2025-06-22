import React, { useRef } from 'react';
import { Editor, Transforms, Text, Element as SlateElement, Node } from 'slate';
import { useSlate } from 'slate-react';
import { FaBold, FaItalic, FaUnderline, FaCode, FaQuoteLeft, FaListOl, FaListUl, FaImage } from 'react-icons/fa';
import { uploadEditorImage } from '../../utils/api';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const withImages = editor => {
  const { insertData, isVoid, normalizeNode } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };
  
  editor.normalizeNode = entry => {
    const [node, path] = entry;

    if (path.length === 0) {
      const lastChild = editor.children[editor.children.length - 1];
      if (lastChild && SlateElement.isElement(lastChild) && editor.isVoid(lastChild)) {
        const paragraph = {
          type: 'paragraph',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, paragraph, { at: [editor.children.length] });
        return;
      }
    }
    
    normalizeNode(entry);
  };

  editor.insertData = data => {
    const { files } = data;
    if (files && files.length > 0) {
      for (const file of files) {
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          const formData = new FormData();
          formData.append('image', file);
          uploadEditorImage(formData).then(res => {
            if (res.success) {
              insertImage(editor, res.url);
            } else {
              alert('Image upload failed: ' + res.message);
            }
          }).catch(error => {
            alert('Image upload failed: ' + error.message);
          });
        }
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const ImageButton = () => {
  const editor = useSlate();
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadEditorImage(formData);
      if (res.success) {
        insertImage(editor, res.url);
      } else {
        alert('Image upload failed: ' + res.message);
      }
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        onMouseDown={event => {
          event.preventDefault();
          fileInputRef.current.click();
        }}
        className={`p-2 rounded transition-colors text-gray-300 hover:bg-gray-700`}
      >
        <FaImage />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  const isAlign = TEXT_ALIGN_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !isAlign,
    split: true,
  });

  let newProperties;
  if (isAlign) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && (n.type === format || n.align === format),
  });

  return !!match;
};

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);
  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      className={`p-2 rounded transition-colors text-gray-300 hover:bg-gray-700 ${isActive ? 'bg-indigo-600 text-white' : ''}`}
    >
      {icon}
    </button>
  );
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      className={`p-2 rounded transition-colors text-gray-300 hover:bg-gray-700 ${isActive ? 'bg-indigo-600 text-white' : ''}`}
    >
      {icon}
    </button>
  );
};

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }
  return <span {...attributes}>{children}</span>;
};

export const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'image':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={element.url}
              alt=""
              className="block max-w-full max-h-80"
            />
          </div>
          {children}
        </div>
      );
    case 'block-quote':
      return <blockquote style={style} className="border-l-4 pl-4 italic" {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul style={style} className="list-disc pl-8" {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 style={style} className="text-3xl font-bold" {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 style={style} className="text-2xl font-bold" {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 style={style} className="text-xl font-bold" {...attributes}>{children}</h3>;
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol style={style} className="list-decimal pl-8" {...attributes}>{children}</ol>;
    default:
      return <p style={style} {...attributes}>{children}</p>;
  }
}; 