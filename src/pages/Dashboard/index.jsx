import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi, deleteBlog } from "../../../utils/api.js";
import SnippetList from "../Snippet/SnippetList.jsx";
import JobListings from "../../components/JobListings.jsx";

const Dashboard = () => {
  const { userId } = useParams();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchDataFromApi("/api/blog");
        if (response.error) throw new Error(response.message);
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchDataFromApi("/api/project");
        if (response.error) throw new Error(response.message);
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchSnippets = async () => {
      const data = await fetchDataFromApi("/api/snippet");
      setSnippets(data);
    };
    fetchSnippets();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await deleteBlog(blogId);
      if (response.error) throw new Error(response.message);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="bg-zinc-800">
      <div className="bg-zinc-200 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">😂 OWW!! This is my Dashboard</h1>
        <p className="mb-6">
          <strong>I am using now-</strong> {email}
        </p>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/dashboard/add-blog")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Blog
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-red-800">
          I have published {blogs.length} blogs{" "}
          {blogs.length > 10 ? "😮" : blogs.length > 5 ? "🤣" : "😊 cause I am cool."}
        </h2>

        {/* Blog Table */}
        <table className="w-full border text-left mb-10">
          <thead className="bg-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog._id || index}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="hover:bg-gray-100 cursor-pointer group"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate(`/blog/${blog._id}`);
                }}
              >
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border font-semibold group-hover:underline">{blog.title}</td>
                <td className="p-2 border">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {blog.categories?.join(", ") || "Uncategorized"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/edit-blog/${blog._id}`);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBlog(blog._id);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Project Table */}
         <button
            onClick={() => navigate("/dashboard/add-project")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add project
          </button>
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          I have done {projects.length} projects{" "}
          {projects.length > 10 ? "💼🔥" : projects.length > 5 ? "🚀" : "✨"}
        </h2>
        <table className="w-full border text-left mb-10">
          <thead className="bg-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project._id || index}
                onClick={() => navigate(`/project/${project._id}`)}
                className="hover:bg-gray-100 cursor-pointer group"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate(`/project/${project._id}`);
                }}
              >
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border font-semibold group-hover:underline">
                  {project.title}
                </td>
                <td className="p-2 border">
                  {new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {project.categories?.join(", ") || "Uncategorized"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Snippet List */}
        <div className="mt-5">
          <h1 className="text-2xl font-semibold text-red-800 mb-2">
            My All code snippet List
          </h1>
          {snippets.map((snip) => (
            <div key={snip._id} className="border p-4 mb-4 bg-gray-100 rounded">
              <h3 className="text-xl font-semibold">
                {snip.title} ({snip.language})
              </h3>
              <p className="text-sm text-gray-600">
                Category: {snip.category || "None"}
              </p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="mt-8">
          <JobListings />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
