import React from 'react';

const Footer= ()=> {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left: Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Shahan Ahmed. All rights reserved.
        </p>

     
        <nav className="space-x-6 mb-4 md:mb-0">
          <a href="#projects" className="hover:text-white transition-colors duration-300">Projects</a>
          <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
        </nav>

     
        <div className="flex space-x-6">
          <a href="https://github.com/shahan24h" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" >
              <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.09-0.745 0.083-0.73 0.083-0.73 1.205 0.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492 0.997 0.108-0.776 0.418-1.305 0.76-1.605-2.665-0.3-5.467-1.332-5.467-5.93 0-1.31 0.467-2.38 1.236-3.22-0.124-0.303-0.536-1.523 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.29-1.552 3.296-1.23 3.296-1.23 0.655 1.653 0.243 2.873 0.12 3.176 0.77 0.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92 0.43 0.37 0.823 1.102 0.823 2.222 0 1.606-0.014 2.896-0.014 3.286 0 0.322 0.216 0.694 0.825 0.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/shahan24h/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" >
              <path d="M4.98 3.5c0 1.381-1.12 2.5-2.5 2.5S0 4.881 0 3.5 1.12 1 2.5 1 4.98 2.119 4.98 3.5zM.22 7.5h4.56v14H.22v-14zm7.54 0h4.38v1.94h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99v7.44h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5v6.7H7.76v-14z" />
            </svg>
          </a>
          {/* <a href="https://twitter.com/yourusername" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" >
              <path d="M23.954 4.569c-0.885 0.392-1.83 0.656-2.825 0.775 1.014-0.611 1.794-1.574 2.163-2.724-0.951 0.564-2.005 0.974-3.127 1.195-0.897-0.956-2.178-1.555-3.594-1.555-2.723 0-4.93 2.206-4.93 4.927 0 0.39 0.045 0.765 0.13 1.124-4.094-0.205-7.725-2.167-10.158-5.144-0.425 0.724-0.666 1.562-0.666 2.457 0 1.69 0.86 3.177 2.17 4.05-0.799-0.026-1.552-0.244-2.21-0.609v0.061c0 2.364 1.68 4.337 3.91 4.783-0.41 0.11-0.842 0.17-1.287 0.17-0.314 0-0.615-0.03-0.91-0.086 0.617 1.923 2.406 3.32 4.523 3.36-1.66 1.3-3.75 2.08-6.023 2.08-0.39 0-0.779-0.023-1.17-0.069 2.147 1.38 4.7 2.185 7.446 2.185 8.936 0 13.835-7.41 13.835-13.83 0-0.21-0.004-0.42-0.014-0.63 0.95-0.686 1.78-1.55 2.44-2.53z" />
            </svg>
          </a> */}
        </div>
      </div>
    </footer>
  );
}


export default Footer; 