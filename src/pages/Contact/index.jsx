import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://your-backend-domain.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center font-primary">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              I'd love to hear from you! Whether it's a project, job opportunity, or just a chat.
            </p>

            <ul className="space-y-4 text-lg">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:shahan24h@gmail.com" className="text-blue-400 hover:underline">
                  shahan24h@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+1234567890" className="text-blue-400 hover:underline">
                  +123 456 7890
                </a>
              </li>
              <li>
                <strong>Location:</strong> New York, USA
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
