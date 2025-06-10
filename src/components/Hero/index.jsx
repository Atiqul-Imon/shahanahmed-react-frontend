import React from "react";
import { FaSearch, FaDatabase, FaChartBar, FaGlobe } from "react-icons/fa";
// import clientImg from "../../assets/shahan_ahmed.png"; 


  const downloadResume = () => {
 
    window.open(`${import.meta.env.VITE_API_URL}/api/download-resume`, '_blank');
   window.alert("Resume Downloaded")
  };

const Hero = () => {
  return (
    <section className="bg-zinc-900 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center text-white">

        {/* Client Image */}
        {/* <div className="flex justify-center mb-6">
          <img
            src={clientImg}
            alt="Client"
            className="w-[200px] h-[200px] rounded-full border-2 border-gray-200  shadow-lg object-cover"
          />
        </div> */}

        <h2 className="text-3xl font-semibold mb-4">Specializing in</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-300">
          Completely synergize resource taxing relationships via premier niche markets.
          Professionally cultivate one-to-one customer service.
        </p>

     <div className="mb-8 md:hidden">
          <button
            onClick={downloadResume}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition font-medium"
          >
            Resume
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#1E293B] rounded-xl p-6 text-left hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <FaSearch className="text-blue-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Research Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Expert at uncovering patterns in unstructured data to inform strategy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1E293B] rounded-xl p-6 text-left hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <FaDatabase className="text-green-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Data Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Skilled at analyzing large datasets to drive performance decisions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1E293B] rounded-xl p-6 text-left hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <FaChartBar className="text-yellow-400 text-xl mr-3" />
              <h3 className="text-lg font-semibold">BI Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Creating dashboards and reports to visualize KPIs and metrics.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1E293B] rounded-xl p-6 text-left hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <FaGlobe className="text-purple-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Market Research</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Gathering insights on competitors and customer behavior trends.
            </p>
          </div>
        </div>
      </div>

 

    </section>
  );
};

export default Hero;
