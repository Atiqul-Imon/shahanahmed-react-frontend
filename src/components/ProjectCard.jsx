import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  // Guard against undefined project
  if (!project) {
    return (
      <div className="bg-gray-800 shadow-md overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-700 h-80 w-full" />
          <div className="p-6">
            <div className="h-7 bg-gray-700  mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-700  w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/project/${project._id}`} className="block">
      <div className="bg-gray-800 shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105  h-full">
        {/* Image with fallback */}
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title || "Project image"}
            className="w-full h-80 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.replaceChild(
                Object.assign(document.createElement("div"), {
                  className: "bg-gray-900 h-80 flex items-center justify-center"
                }),
                e.target
              );
            }}
          />
        ) : (
          <div className="bg-gray-900 h-80 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-2 truncate">
            {project.title || "Untitled Project"}
          </h2>
          
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span>
              {project.createdAt
                ? new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No date"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;