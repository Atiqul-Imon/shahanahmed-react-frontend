import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TiptapEditor from '../../components/TiptapEditor.jsx';
import { updateBlog, fetchDataFromApi } from '../../../utils/api.js';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await fetchDataFromApi(`/api/blog/${id}`);
      setFormData({
        title: data.title,
        description: data.description
      });
      setPreview(data.image?.url || '');
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async () => {
    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    if (formData.image) formPayload.append('image', formData.image);

    try {
      setLoading(true);
      const response = await updateBlog(id, formPayload);
      if (response.error) throw new Error(response.message);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {preview && (
            <div className="mt-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-48 w-full object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <TiptapEditor 
            content={description}
            setContent={setDescription}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            transition-colors duration-200`}
        >
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </div>
    </div>
  );

};

export default EditBlog;