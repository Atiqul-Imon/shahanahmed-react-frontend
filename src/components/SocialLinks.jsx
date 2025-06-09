export default function SocialLinks() {
  return (
    <section className="bg-zinc-900 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6 tracking-wide">
          Connect with Me
        </h2>

        <div className="flex justify-center items-center space-x-8">
          {/* GitHub */}
          <a
            href="https://github.com/shahan24h"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <title>GitHub</title>
               <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.09-0.745 0.083-0.73 0.083-0.73 1.205 0.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492 0.997 0.108-0.776 0.418-1.305 0.76-1.605-2.665-0.3-5.467-1.332-5.467-5.93 0-1.31 0.467-2.38 1.236-3.22-0.124-0.303-0.536-1.523 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.29-1.552 3.296-1.23 3.296-1.23 0.655 1.653 0.243 2.873 0.12 3.176 0.77 0.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92 0.43 0.37 0.823 1.102 0.823 2.222 0 1.606-0.014 2.896-0.014 3.286 0 0.322 0.216 0.694 0.825 0.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shahan24h/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <title>LinkedIn</title>
              <path d="M4.98 3.5c0 1.381-1.12 2.5-2.5 2.5S0 4.881 0 3.5 1.12 1 2.5 1 4.98 2.119 4.98 3.5zM.22 7.5h4.56v14H.22v-14zm7.54 0h4.38v1.94h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99v7.44h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5v6.7H7.76v-14z" />
            </svg>
          </a>

          {/* Hugging Face */}
          <a
            href="https://huggingface.co/shahan24h/ai-mini-mlm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hugging Face"
            className="transition duration-300 ease-in-out transform hover:scale-110"
          >
            <img
              src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
              alt="Hugging Face"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
