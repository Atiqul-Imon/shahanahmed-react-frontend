import React from "react";
import { FaSearch, FaDatabase, FaChartBar, FaGlobe } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-zinc-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Specializing in</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-300">
          Completely synergize resource taxing relationships via premier niche markets. Professionally
          cultivate one-to-one customer service.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#1E293B] rounded-lg p-6 text-left">
            <div className="flex items-center mb-3">
              <FaSearch className="text-blue-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Research Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1E293B] rounded-lg p-6 text-left">
            <div className="flex items-center mb-3">
              <FaDatabase className="text-green-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Data Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1E293B] rounded-lg p-6 text-left">
            <div className="flex items-center mb-3">
              <FaChartBar className="text-yellow-400 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Business Intelligence Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1E293B] rounded-lg p-6 text-left">
            <div className="flex items-center mb-3">
              <FaGlobe className="text-purple-500 text-xl mr-3" />
              <h3 className="text-lg font-semibold">Market Research Analyst</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
