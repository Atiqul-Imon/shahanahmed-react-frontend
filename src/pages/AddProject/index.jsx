import React, { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createProject } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { 
  FaBold, FaItalic, FaUnderline, FaCode, FaQuoteLeft, FaListOl, FaListUl, 
  FaStrikethrough
} from 'react-icons/fa';
import { MarkButton, BlockButton, ImageButton, Element, Leaf, withImages } from '../../components/SlateEditor.jsx';
import DashboardLayout from '../Dashboard/DashboardLayout';

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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
    }
    setImages(files);
    setError('');

    const newPreviews = files.map(file => {
        const url = URL.createObjectURL(file);
        return {url, name: file.name};
    });
    setPreviews(newPreviews);
  };
  
  const removePreview = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || images.length === 0) {
      setError('Title and at least one image are required.');
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
        setError(res.message || 'An unknown error occurred');
      }
    } catch (error) {
      setError(error.message || 'A network or server error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="bg-gray-800 border border-gray-700 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create New Project</h1>
        <p className="text-gray-400 mb-8">Fill out the details below to add a new project to your portfolio.</p>

        {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 mb-6" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI-Powered Data Analysis Tool"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-1">Project Images (Max 5)</label>
            <input
              id="images"
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
             {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {previews.map((preview, index) => (
                    <div key={index} className="relative">
                        <img src={preview.url} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover" />
                        <button type="button" onClick={() => removePreview(index)} className="absolute top-1 right-1 bg-red-600 text-white p-1 text-xs">X</button>
                    </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Description</label>
            <div className="bg-gray-700 border border-gray-600 text-white">
              <Slate 
                editor={editor} 
                initialValue={description} 
                onChange={value => setDescription(value)}
              >
                <div className="flex flex-wrap items-center p-2 bg-gray-800 border-b border-gray-600 gap-1 text-white">
                    <MarkButton format="bold" icon={<FaBold />} />
                    <MarkButton format="italic" icon={<FaItalic />} />
                    <MarkButton format="underline" icon={<FaUnderline />} />
                    <MarkButton format="code" icon={<FaCode />} />
                    <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
                    <BlockButton format="heading-one" icon={<strong className="border border-gray-600 px-1 text-xs">H1</strong>} />
                    <BlockButton format="heading-two" icon={<strong className="border border-gray-600 px-1 text-xs">H2</strong>} />
                    <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
                    <BlockButton format="numbered-list" icon={<FaListOl />} />
                    <BlockButton format="bulleted-list" icon={<FaListUl />} />
                    <ImageButton />
                </div>
                <div className="p-4">
                  <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Project details"
                    className="min-h-[300px] focus:outline-none prose prose-invert max-w-none"
                  />
                </div>
              </Slate>
            </div>
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-1">Technologies (comma-separated)</label>
            <input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., React, Node.js, Python, TensorFlow"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300 mb-1">Live URL</label>
              <input
                id="liveUrl"
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-300 mb-1">Source Code URL</label>
              <input
                id="sourceUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Project...' : 'Create Project'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProject;