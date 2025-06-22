import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { format } from "date-fns";
import { FiArrowLeft, FiCalendar, FiExternalLink, FiGithub, FiTag } from "react-icons/fi";
import SEO from "../../components/SEO";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { Element, Leaf } from "../../components/SlateEditor";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [descriptionValue, setDescriptionValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchDataFromApi(`/api/project/${id}`);
        if (response.error) {
          throw new Error(response.message || 'Failed to fetch project details.');
        }
        setProject(response.data);
        
        let descriptionContent = [];
        if (typeof response.data.description === 'string') {
          try {
            descriptionContent = JSON.parse(response.data.description);
          } catch (e) {
            console.error("Failed to parse description JSON:", e);
            // Handle case where description is a plain string but not valid JSON
            descriptionContent = [{ type: 'paragraph', children: [{ text: response.data.description }] }];
          }
        } else if (Array.isArray(response.data.description)) {
          descriptionContent = response.data.description;
        }

        // Ensure the content has at least one node, otherwise Slate can crash.
        if (descriptionContent.length === 0) {
          descriptionContent.push({ type: 'paragraph', children: [{ text: '' }] });
        }

        setDescriptionValue(descriptionContent);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const serializeForMeta = (nodes) => {
    if (!nodes || !Array.isArray(nodes)) return '';
    return nodes.map(n => {
      if (n.children) {
        return serializeForMeta(n.children);
      }
      return n.text || '';
    }).join(' ');
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-900"><LoadingSpinner /></div>;
  if (error) return <div className="text-white text-center py-10"><ErrorMessage message={error} /></div>;
  if (!project) return null;

  const hasImages = project.images && project.images.length > 0;

  const metaDescription = descriptionValue.length > 0 ? serializeForMeta(descriptionValue).substring(0, 160) + '...' : "Details about Shahan Ahmed's project.";

  return (
    <>
      <SEO 
        title={`${project.title} - Shahan Ahmed's Project`}
        description={metaDescription}
        image={project.images && project.images[0]?.url}
        url={`https://www.shahanahmed.com/project/${project._id}`}
        type="article"
      />
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <FiArrowLeft />
            Back to Projects
          </button>

          <main className="bg-gray-800 shadow-lg overflow-hidden">
            {/* Image Gallery */}
            {hasImages && (
              <div className="bg-gray-900 p-4">
                <img
                  src={project.images[selectedImage].url}
                  alt={`${project.title} screenshot ${selectedImage + 1}`}
                  className="w-full h-auto md:h-[500px] object-contain"
                />
                {project.images.length > 1 && (
                  <div className="p-4 flex justify-center gap-4">
                    {project.images.map((image, index) => (
                      <button key={image.public_id} onClick={() => setSelectedImage(index)}>
                        <img
                          src={image.url}
                          alt={`thumbnail ${index + 1}`}
                          className={`w-20 h-20 object-cover cursor-pointer border-4 transition ${selectedImage === index ? 'border-indigo-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Content */}
              <article className="lg:col-span-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">{project.title}</h1>
                <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                  {descriptionValue.length > 0 && (
                    <Slate editor={editor} initialValue={descriptionValue} key={JSON.stringify(descriptionValue)}>
                      <Editable
                        readOnly
                        renderElement={(props) => <Element {...props} />}
                        renderLeaf={(props) => <Leaf {...props} />}
                      />
                    </Slate>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="bg-gray-800 p-6 sticky top-24 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-400 flex items-center"><FiCalendar className="mr-2" /> Published On</h3>
                      <p className="text-gray-300">
                        {project.publishDate ? format(new Date(project.publishDate), "MMMM d, yyyy") : 'Not specified'}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-400 flex items-center"><FiTag className="mr-2" /> Technologies</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-indigo-900 text-indigo-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 flex space-x-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                          <FiExternalLink className="mr-2" /> Live Site
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                          <FiGithub className="mr-2" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
