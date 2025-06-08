import React, { useState, useRef } from 'react';
import TiptapEditor from '../../components/TiptapEditor';
import { createProject } from '../../../utils/api.js';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!title || !description) {
        alert('Please fill in all required fields');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);
      
  

      const data = await createProject(formData);
      
      if (data.error) throw new Error(data.message);

      console.log('Project saved:', data);
      alert('Project created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setPreview('');

    } catch (error) {
      console.error('Error saving project:', error);
      alert(error.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Project Post</h1>

      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter project title"
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
          {loading ? 'Publishing...' : 'Publish Project'}
        </button>
      </div>
    </div>
  );
};

export default AddProject;