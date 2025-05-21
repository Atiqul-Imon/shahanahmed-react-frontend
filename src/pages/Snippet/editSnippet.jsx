import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi, updateSnippet } from "../../../utils/api";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    language: "Python",
    category: "",
  });

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await fetchDataFromApi(`/api/snippet/${id}`);
        setSnippet(data);
      } catch (error) {
        console.error("Failed to fetch snippet:", error);
        navigate("/snippet-list");
      }
    };
    fetchSnippet();
  }, [id, navigate]);

  const handleChange = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateSnippet(id, snippet);
    if (!result.error) {
      navigate("/snippet-list");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <input
        name="title"
        placeholder="Title"
        value={snippet.title}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />

      <select
        name="language"
        value={snippet.language}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      >
        <option>Python</option>
        <option>SQL</option>
        <option>R</option>
        <option>Markdown</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={snippet.category}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />

      <textarea
        name="code"
        placeholder="Write your code here..."
        value={snippet.code}
        onChange={handleChange}
        rows="10"
        className="w-full p-2 border mb-4"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Snippet
      </button>
    </form>
  );
};

export default EditSnippet;