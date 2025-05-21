import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} key={blog._id}>
      <div className="bg-gray-800 shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105">
        {blog.image && (
          <img
            src={blog.image.url}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {blog.title}
          </h2>
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.categories?.map((category) => (
              <span
                key={category}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                #{category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
