import React from 'react';

const recentProjects = [
  {
    id: 1,
    title: 'Sales Dashboard',
    description: 'Interactive Power BI dashboard showcasing sales trends and KPIs.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Customer Insights',
    description: 'Deep dive into customer behavior and segmentation using Power BI.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Operational Metrics',
    description: 'Comprehensive view of operational efficiency through data visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  },
];

const RecentProjects =()=> {
  return (
    <section className="bg-gray-900 text-gray-100 py-16 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 font-primary ">Recent Projects</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Welcome to my professional portfolio! As a passionate data analyst, I specialize in transforming complex data into actionable insights using Power BI. Browse through my curated collection of dashboards that reflect my expertise and dedication to enhancing business intelligence through meticulous data visualization.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {recentProjects.map(({ id, title, description, imageUrl }) => (
          <div key={id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;