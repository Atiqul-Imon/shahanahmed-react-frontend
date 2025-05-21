import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { format } from "date-fns";
import { FiArrowLeft, FiUser, FiCalendar, FiTag } from "react-icons/fi";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchDataFromApi(`/api/blog/${id}`);
        if (response.error) throw new Error(response.message);
        setBlog(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
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
          Back to Blogs
        </button>

        <article className="bg-white shadow-lg overflow-hidden">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
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
                {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
              </div>
              {blog.author && (
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  <span className="font-medium">{blog.author.name}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </div>

            {blog.categories?.length > 0 && (
              <div className="border-t pt-6 mt-8">
                <div className="flex items-center mb-4">
                  <FiTag className="mr-2 text-gray-500" />
                  <h3 className="text-lg font-medium text-gray-700">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category) => (
                    <span
                      key={category}
                      className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailsPage;