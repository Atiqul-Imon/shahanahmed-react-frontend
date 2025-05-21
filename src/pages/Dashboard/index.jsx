import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api.js"
import SnippetList from "../Snippet/SnippetList.jsx";
import JobListings from "../../components/JobListings.jsx";

const Dashboard = () => {
  const { userId } = useParams();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchDataFromApi("/api/blog");
        if (response.error) throw new Error(response.message);
        setBlogs(response.data); // assume response.data is an array of blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

   
  
    useEffect(() => {
      const fetchSnippets = async () => {
       const data = await fetchDataFromApi("/api/snippet");
       
       setSnippets(data);
      };
      fetchSnippets();
    }, []);

  return (
    <section className="bg-zinc-800">
          <div className="bg-zinc-200 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">😂 OWW!! This is my Dashboard</h1>

      
      <p className="mb-6"><strong>I am using now-</strong> {email}</p>

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
  {blogs.length > 10
    ? "😮"
    : blogs.length > 5
    ? "🤣"
    : "😊 cause I am cool."}
</h2>
     <table className="w-full border text-left">
        <thead className="bg-white">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Category</th>
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
              <td className="p-2 border font-semibold  group-hover:underline">
                {blog.title}
              </td>
              <td className="p-2 border">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">{blog.category || "Uncategorized"}</td>
            </tr>
          ))}
        </tbody>
      </table>
 
<div className="mt-5">
  <h1 className="text-2xl font-semibold text-red-800 mb-2">My All code snippet List </h1>

{snippets.map((snip) => (
        <div key={snip._id} className="border p-4 mb-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold">{snip.title} ({snip.language})</h3>
          <p className="text-sm text-gray-600">Category: {snip.category || "None"}</p>
          
        </div>
      ))}


</div>

<div>

<JobListings />

</div>

    </div>
    </section>

  );
};

export default Dashboard;
