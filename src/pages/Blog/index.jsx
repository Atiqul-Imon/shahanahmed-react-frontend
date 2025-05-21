import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api.js";
import BlogCard from "../../components/BlogCard.jsx";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchDataFromApi("/api/blog");
        if (response.error) throw new Error(response.message);
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 md:p-12 flex justify-center items-center">
        <div className="text-white text-lg">Loading blogs...</div>
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
          My Blogs
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog)=>(
            <BlogCard key={blog._id} blog={blog} />
          ))}        </div>
      </div>
    </div>
  );
};

export default BlogPage;