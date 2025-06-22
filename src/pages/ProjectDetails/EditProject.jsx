import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProject, fetchDataFromApi } from '../../../utils/api.js';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { FaBold, FaItalic, FaUnderline, FaCode, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';
import { MarkButton, BlockButton, ImageButton, Element, Leaf, withImages } from '../../components/SlateEditor.jsx';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useMemo(() => withHistory(withReact(withImages(createEditor()))), []);

  const [projectData, setProjectData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(null); // Initialize as null
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

        // Safely parse the description
        try {
          const parsedDescription = JSON.parse(project.description);
          if(Array.isArray(parsedDescription)) {
            setDescription(parsedDescription);
          } else {
            // Handle case where description is a string but not a valid Slate array
            setDescription([{ type: 'paragraph', children: [{ text: project.description || '' }] }]);
          }
        } catch (e) {
          // Handle non-JSON description (e.g., old markdown)
          setDescription([{ type: 'paragraph', children: [{ text: project.description || '' }] }]);
        }

        setProjectData(project);
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
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', JSON.stringify(description));
    formData.append('technologies', technologies);
    formData.append('liveUrl', liveUrl);
    formData.append('sourceUrl', sourceUrl);
    // Note: This form doesn't handle gallery image updates. That's a separate feature.

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Project</h1>
        <p className="text-gray-500 mb-8">Update the details for your project.</p>
        
        {description && ( // Only render form when description is ready
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
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
                  <div className="flex items-center p-2 bg-gray-100 border-b border-gray-300 space-x-2">
                      <MarkButton format="bold" icon={<FaBold />} />
                      <MarkButton format="italic" icon={<FaItalic />} />
                      <MarkButton format="underline" icon={<FaUnderline />} />
                      <MarkButton format="code" icon={<FaCode />} />
                      <BlockButton format="heading-one" icon={<strong>H1</strong>} />
                      <BlockButton format="heading-two" icon={<strong>H2</strong>} />
                      <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
                      <BlockButton format="numbered-list" icon={<FaListOl />} />
                      <BlockButton format="bulleted-list" icon={<FaListUl />} />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700 mb-1">Source Code URL</label>
                <input
                  id="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Updating Project...' : 'Update Project'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProject;