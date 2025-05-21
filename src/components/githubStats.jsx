import React from 'react';

const GitHubStats = () => {
  return (
    <section className="py-12 bg-gray-900 text-center">
   
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">GitHub Contributions</h2>
        <img
          src="https://ghchart.rshah.org/Atiqul-Imon"
          alt="GitHub Contribution Chart"
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default GitHubStats;
