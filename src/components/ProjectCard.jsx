import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Calendar, ArrowRight, Code, Eye } from "lucide-react";
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Node } from 'slate';

const ProjectCard = ({ project }) => {
  // Guard against undefined project
  if (!project) {
    return (
      <div className="bg-white shadow-soft overflow-hidden border border-gray-100">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 w-full" />
          <div className="p-6">
            <div className="h-6 bg-gray-200 mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 w-full mb-2"></div>
            <div className="h-4 bg-gray-200 w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const serializeDescription = (description) => {
    if (typeof description === 'string') {
      try {
        const parsed = JSON.parse(description);
        if (Array.isArray(parsed)) {
          return parsed.map(n => Node.string(n)).join(' ');
        }
      } catch (e) {
        // Not a JSON string, return as is
        return description;
      }
    }
    if (Array.isArray(description)) {
      return description.map(n => Node.string(n)).join(' ');
    }
    return '';
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-blue-400 to-indigo-500',
      'from-green-400 to-teal-500',
      'from-purple-400 to-pink-500',
      'from-orange-400 to-red-500',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <Link 
      to={`/project/${project._id}`} 
      className="block bg-white shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group"
    >
      <div className="relative">
        {/* Image with fallback */}
        <div className="relative overflow-hidden">
          {(project.images && project.images.length > 0) ? (
            <img
              src={project.images[0].url}
              alt={project.title || "Project image"}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.replaceChild(
                  Object.assign(document.createElement("div"), {
                    className: `bg-gradient-to-br ${getRandomGradient()} h-64 flex items-center justify-center`
                  }),
                  e.target
                );
              }}
            />
          ) : project.image?.url ? (
            <img
              src={project.image.url}
              alt={project.title || "Project image"}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.replaceChild(
                  Object.assign(document.createElement("div"), {
                    className: `bg-gradient-to-br ${getRandomGradient()} h-64 flex items-center justify-center`
                  }),
                  e.target
                );
              }}
            />
          ) : (
            <div className={`bg-gradient-to-br ${getRandomGradient()} h-64 flex items-center justify-center`}>
              <div className="text-white text-center">
                <Code size={48} className="mx-auto mb-2 opacity-80" />
                <span className="text-sm font-medium">No image available</span>
              </div>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-medium">
                <Eye size={20} className="text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{project.title}</h3>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(project.createdAt)}</span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {serializeDescription(project.description)}
            </p>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-200">
              View Details
            </span>
            <ArrowRight size={16} className="text-primary-600 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;