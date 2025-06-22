import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, FileText, Eye } from "lucide-react";
import { format } from 'date-fns';
import { FiArrowRight } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  const authorImage = blog.author?.image?.url || 'https://via.placeholder.com/40';
  const authorName = blog.author?.name || 'Anonymous';

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-purple-500 to-pink-600",
      "from-blue-500 to-cyan-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-600",
      "from-indigo-500 to-purple-600",
      "from-teal-500 to-blue-600",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <Link to={`/blog/${blog._id}`} className="block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
      {blog.image?.url ? (
        <img
          src={blog.image.url}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className={`w-full h-56 bg-gradient-to-br ${getRandomGradient()}`} />
      )}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">
          {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 truncate group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        <div 
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full mr-3 object-cover" />
            <div>
              <p className="font-semibold text-gray-700">{authorName}</p>
            </div>
          </div>
          <div className="flex items-center text-blue-600">
            Read More
            <FiArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
