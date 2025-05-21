import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchDataFromApi('/api/jobs?query=data%20analyst&location=USA');
        
    
        setJobs(response || []);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setError(error.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <section className="py-10 px-4 bg-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6">Live Job Around My Location</h2>
      <div className="grid gap-4 max-w-4xl mx-auto">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="p-4 border bg-slate-200 ">
              <h3 className="text-xl font-semibold">{job.title}</h3>
             
              <p className="text-black">{job.location?.display_name || 'Location not specified'}</p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 underline mt-2 block"
              >
                View Job
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default JobListings;