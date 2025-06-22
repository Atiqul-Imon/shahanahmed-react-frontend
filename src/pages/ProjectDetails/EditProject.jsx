import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProject, fetchDataFromApi } from '../../../utils/api.js';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { FaBold, FaItalic, FaUnderline, FaCode, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';
import { MarkButton, BlockButton, ImageButton, Element, Leaf, withImages } from '../../components/SlateEditor.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useMemo(() => withHistory(withReact(withImages(createEditor()))), []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState([{ type: 'paragraph', children: [{ text: '' }] }]);
  const [technologies, setTechnologies] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetchDataFromApi(`/api/project/${id}`);
        const project = response.data;
        
        setTitle(project.title);
        setTechnologies(project.technologies.join(', '));
        setLiveUrl(project.liveUrl || '');
        setSourceUrl(project.sourceUrl || '');

        let parsedDescription;
        if (typeof project.description === 'string') {
          try {
            parsedDescription = JSON.parse(project.description);
          } catch (e) {
            parsedDescription = [{ type: 'paragraph', children: [{ text: project.description }] }];
          }
        } else {
            parsedDescription = project.description;
        }

        if (Array.isArray(parsedDescription) && parsedDescription.length > 0) {
            setDescription(parsedDescription);
        } else {
            setDescription([{ type: 'paragraph', children: [{ text: '' }] }]);
        }

      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError('Failed to load project data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required.");
      return;
    }
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', JSON.stringify(description));
    formData.append('technologies', technologies);
    formData.append('liveUrl', liveUrl);
    formData.append('sourceUrl', sourceUrl);

    try {
      const res = await updateProject(id, formData);
      if (res.success) {
        navigate(`/projects/${id}`);
      } else {
        setError(res.message || 'An unknown error occurred');
      }
    } catch (error) {
      setError(error.message || 'A network or server error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="bg-gray-900 min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  
  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
        <p className="text-gray-400 mb-8">Update the details for your project.</p>
        
        {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 mb-6" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Description</label>
            <div className="bg-gray-700 border border-gray-600 text-white">
              <Slate 
                editor={editor} 
                initialValue={description}
                key={id} // Use ID to re-key when a different project is loaded
                onChange={value => setDescription(value)}
              >
                <div className="flex items-center p-2 bg-gray-800 border-b border-gray-600 space-x-1">
                    <MarkButton format="bold" icon={<FaBold />} />
                    <MarkButton format="italic" icon={<FaItalic />} />
                    <MarkButton format="underline" icon={<FaUnderline />} />
                    <MarkButton format="code" icon={<FaCode />} />
                    <BlockButton format="heading-one" icon={<strong className="border border-gray-600 px-1">H1</strong>} />
                    <BlockButton format="heading-two" icon={<strong className="border border-gray-600 px-1">H2</strong>} />
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
                    className="min-h-[250px] focus:outline-none prose prose-invert max-w-none"
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating Project...' : 'Update Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;