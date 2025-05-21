import React, { useEffect, useState } from "react";
import { fetchDataFromApi, deleteSnippet } from "../../../utils/api";
import { Link } from "react-router-dom";

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const data = await fetchDataFromApi("/api/snippet");
      setSnippets(data);
    } catch (error) {
      console.error("Failed to fetch snippets:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      const result = await deleteSnippet(id);
      if (!result.error) {
        setSnippets(snippets.filter(snip => snip._id !== id));
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Saved Snippets</h2>
        <Link to="/add-snippet" className="bg-green-600 text-white px-4 py-2 rounded">
          Add New Snippet
        </Link>
      </div>
      
      {snippets.map((snip) => (
        <div key={snip._id} className="border p-4 mb-4 bg-gray-100 rounded">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold">{snip.title} ({snip.language})</h3>
              <p className="text-sm text-gray-600">Category: {snip.category || "None"}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/edit-snippet/${snip._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(snip._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          <pre className="bg-white p-2 mt-2 overflow-auto"><code>{snip.code}</code></pre>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;