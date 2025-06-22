import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { format } from "date-fns";
import { FiArrowLeft, FiCalendar, FiExternalLink, FiGithub, FiTag } from "react-icons/fi";

const Leaf = ({ leaf }) => {
  let children = <>{leaf.text}</>;

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
    children = <code className="bg-gray-200 text-gray-800 px-2 py-1 font-mono text-sm">{children}</code>;
  }

  return children;
}

const Element = ({ element, children }) => {
  switch (element.type) {
    case 'image':
      return (
        <div>
          <img
            src={element.url}
            alt=""
            className="block max-w-full max-h-96 my-4 mx-auto shadow-md"
          />
        </div>
      );
    case 'heading-one':
      return <h1 className="text-3xl font-bold my-4">{children}</h1>;
    case 'heading-two':
      return <h2 className="text-2xl font-bold my-3">{children}</h2>;
    case 'block-quote':
      return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>;
    case 'numbered-list':
      return <ol className="list-decimal list-inside my-4 pl-4 space-y-2">{children}</ol>;
    case 'bulleted-list':
      return <ul className="list-disc list-inside my-4 pl-4 space-y-2">{children}</ul>;
    case 'list-item':
      return <li>{children}</li>;
    case 'paragraph':
      return <p className="leading-relaxed mb-4">{children}</p>;
    default:
      return <div className="mb-4">{children}</div>;
  }
};


const SlateNode = ({ node }) => {
    if (node.text !== undefined) {
        return <Leaf leaf={node} />;
    }

    const children = node.children.map((n, i) => <SlateNode key={i} node={n} />);

    return <Element element={node}>{children}</Element>;
}

const SlateRenderer = ({ content }) => {
  let nodes;
  try {
    nodes = typeof content === 'string' ? JSON.parse(content) : content;
    if (!Array.isArray(nodes)) {
        // This is not a slate object, probably just a string.
        return <p>{content}</p>;
    }
  } catch (error) {
    // It's probably old markdown content. Just render it as text in a p
    return <p>{content}</p>;
  }

  return nodes.map((node, i) => <SlateNode key={i} node={node} />);
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetchDataFromApi(`/api/project/${id}`);
        if (response.error) throw new Error(response.message);
        setProject(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!project) return null;

  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft />
          Back to Projects
        </button>

        <main className="bg-white shadow-lg overflow-hidden">
          {/* Image Gallery */}
          {hasImages && (
            <div className="bg-gray-100 p-4">
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
                        className={`w-20 h-20 object-cover cursor-pointer border-4 transition ${selectedImage === index ? 'border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">{project.title}</h1>
              <div className="space-y-6 text-gray-800">
                <SlateRenderer content={project.description} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="bg-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-600 flex items-center"><FiCalendar className="mr-2" /> Published On</h3>
                    <p className="text-gray-700">
                      {project.publishDate ? format(new Date(project.publishDate), "MMMM d, yyyy") : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-600 flex items-center"><FiTag className="mr-2" /> Technologies</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                      >
                        <FiExternalLink className="mr-2" /> Live Site
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
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
  );
};

export default ProjectDetailsPage;
