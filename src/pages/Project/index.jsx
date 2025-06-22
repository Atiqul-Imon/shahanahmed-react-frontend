import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import { fetchDataFromApi } from "../../../utils/api";
import SEO from "../../components/SEO";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchDataFromApi("/api/project");
        setProjects(data.data || []);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        setProjects([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <>
      <SEO 
        title="Projects - Shahan Ahmed"
        description="Explore a collection of data analysis and web development projects by Shahan Ahmed. See my work on data visualization, BI dashboards, and full-stack applications."
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;