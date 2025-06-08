import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import ProjectCard from './ProjectCard';

function HomeProjectcomponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchDataFromApi("/api/project");

        const projectsData = response.data || response;
        if (!Array.isArray(projectsData)) throw new Error("Invalid response format");

        // Load only first 3 projects
        setProjects(projectsData.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 md:p-12 bg-[#0f1014] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 font-primary">Recent Projects</h1>
        <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto font-primary">
          Welcome to my professional portfolio! As a passionate data analyst, I specialize in transforming
          complex data into actionable insights using Power BI. Browse through my curated collection of
          dashboards that reflect my expertise and dedication to enhancing business intelligence
          through meticulous data visualization.
        </p>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-700 h-64 w-full" />
                  <div className="p-6">
                    <div className="h-7 bg-gray-700  mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-700  w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center py-8">No projects found</p>
        )}
      </div>
    </div>
  );
}

export default HomeProjectcomponent;
