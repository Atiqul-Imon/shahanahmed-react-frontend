import React, { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createProject } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { 
  FaBold, FaItalic, FaUnderline, FaCode, FaQuoteLeft, FaListOl, FaListUl, 
  FaStrikethrough, FaHeading, FaAlignLeft, FaAlignCenter, FaAlignRight 
} from 'react-icons/fa';
import { MarkButton, BlockButton, ImageButton, Element, Leaf, withImages } from '../../components/SlateEditor.jsx';

const AddProject = () => {
  const editor = useMemo(() => withHistory(withReact(withImages(createEditor()))), []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [technologies, setTechnologies] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || images.length === 0) {
      alert('Title, description, and at least one image are required.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', JSON.stringify(description));
    formData.append('technologies', technologies);
    formData.append('liveUrl', liveUrl);
    formData.append('sourceUrl', sourceUrl);
    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const res = await createProject(formData);
      if (res.success) {
        navigate('/dashboard/projects');
      } else {
        alert(`Error: ${res.message || 'An unknown error occurred'}`);
      }
    } catch (error) {
      alert(`Error: ${error.message || 'A network or server error occurred'}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Project</h1>
        <p className="text-gray-500 mb-8">Fill out the details below to add a new project to your portfolio.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI-Powered Data Analysis Tool"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Project Images (Gallery)</label>
            <input
              id="images"
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-dark hover:file:text-white transition"
            />
            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover rounded-lg shadow-md" />
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <div className="border border-gray-300 rounded-lg">
              <Slate 
                editor={editor} 
                initialValue={description} 
                key={JSON.stringify(description)}
                onChange={value => setDescription(value)}
              >
                <div className="flex flex-wrap items-center p-2 bg-gray-100 border-b border-gray-300 space-x-2">
                    <MarkButton format="bold" icon={<FaBold />} />
                    <MarkButton format="italic" icon={<FaItalic />} />
                    <MarkButton format="underline" icon={<FaUnderline />} />
                    <MarkButton format="code" icon={<FaCode />} />
                    <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
                    <BlockButton format="heading-one" icon={<FaHeading className="h-4 w-4" />} />
                    <BlockButton format="heading-two" icon={<FaHeading className="h-5 w-5" />} />
                    <BlockButton format="heading-three" icon={<FaHeading className="h-6 w-6" />} />
                    <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
                    <BlockButton format="numbered-list" icon={<FaListOl />} />
                    <BlockButton format="bulleted-list" icon={<FaListUl />} />
                    <BlockButton format="left" icon={<FaAlignLeft />} />
                    <BlockButton format="center" icon={<FaAlignCenter />} />
                    <BlockButton format="right" icon={<FaAlignRight />} />
                    <ImageButton />
                </div>
                <div className="p-2">
                  <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some rich text…"
                    className="min-h-[200px] focus:outline-none"
                  />
                </div>
              </Slate>
            </div>
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
            <input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., React, Node.js, Python, TensorFlow"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
              <input
                id="liveUrl"
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700 mb-1">Source Code URL</label>
              <input
                id="sourceUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Creating Project...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;