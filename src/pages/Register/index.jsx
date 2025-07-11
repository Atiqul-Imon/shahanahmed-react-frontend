import React, { useState } from "react";
import { postData } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validatePassword = (password) => {
    // Minimum 6 characters with at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setLoading(true);

    // Validate password
    if (!validatePassword(formData.password)) {
      setError(true);
      setMessage("Password must be at least 6 characters with both letters and numbers");
      setLoading(false);
      return;
    }

    try {
      const res = await postData("/api/user/register", formData);

      if (!res.error && res.success) {
        setMessage(res.message);
        
        if (res.data?.accessToken && res.data?.refreshToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        setFormData({ name: "", email: "", password: "" });
        
        // Navigate to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(true);
        setMessage(res.message || "Something Went Wrong");
      }

    } catch (err) {
      setError(true);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Register</h2>

        {message && (
          <div className={`mb-4 text-center text-sm font-medium ${error ? "text-red-500" : "text-green-500"}`}>
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md outline-none bg-gray-700 text-gray-200 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md outline-none bg-gray-700 text-gray-200 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md outline-none bg-gray-700 text-gray-200 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;