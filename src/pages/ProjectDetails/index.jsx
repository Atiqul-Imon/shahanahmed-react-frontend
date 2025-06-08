import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { format } from "date-fns";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Projects
        </button>

        <article className="bg-white shadow-lg overflow-hidden">
          {project.image ? (
            <img
              src={project.image.url}
              alt={project.title}
              className="w-full h-64 md:h-150 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                {format(new Date(project.createdAt), "MMMM dd, yyyy")}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {project.title}
            </h1>

            {project.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
