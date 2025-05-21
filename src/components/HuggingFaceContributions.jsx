import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api.js'; 

const HuggingFaceContributions = () => {
  const [data, setData] = useState({
    models: [],
    datasets: [],
    spaces: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        const response = await fetchDataFromApi('/api/hf-contributions');
        if (!response.error) {
          setData(response);
        } else {
          console.error('API Error:', response.message);
        }
      } catch (error) {
        console.error('Failed to fetch Hugging Face contributions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        Loading Hugging Face contributions...
      </div>
    );
  }

  const renderSection = (title, items, type) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <a
  key={item.id}
  href={`https://huggingface.co/${type ? `${type}/` : ''}${item.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className="block border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-500 transition-all"
>
  <h4 className="text-md font-medium text-blue-600 break-all">{item.id}</h4>
  <p className="text-sm text-gray-500 mt-1">
    Updated: {new Date(item.lastModified || item.updatedAt || item.createdAt).toLocaleDateString()}
  </p>
</a>
          ))}
        </div>
      )}
    </div>
  );

  return (
   <div className="max-w-6xl mx-auto p-6 bg-zinc-900 text-white">
  <h2 className="text-3xl font-bold mb-8 text-center">Hugging Face Contributions</h2>
  {renderSection('Models', data.models, '')}
  {renderSection('Datasets', data.datasets, 'datasets')}
  {renderSection('Spaces', data.spaces, 'spaces')}
</div>
  );
};

export default HuggingFaceContributions;
