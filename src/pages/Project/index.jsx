import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api.js";
import ProjectCard from "../../components/ProjectCard.jsx";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchDataFromApi("/api/project");
        if (response.error) throw new Error(response.message);
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 md:p-12 flex justify-center items-center">
        <div className="text-white text-lg">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center font-primary">
          My Projects
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project)=>(
            <ProjectCard key={project._id} project={project} />
          ))}        </div>
      </div>
    </div>
  );
};

export default ProjectPage;