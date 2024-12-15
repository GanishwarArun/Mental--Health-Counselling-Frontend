import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();  // Initialize the navigate function

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login the user
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',  // Ensure correct content type
        },
      });
      alert('✅ Login successful!');
      console.log('User Logged In:', response.data);

      // Navigate to the dashboard page after successful login
      navigate('/dashboard');  // Redirects the user to the dashboard page
    } catch (error) {
      console.error('❌ Error logging in:', error);
      // Check for specific error message from the server
      if (error.response && error.response.data && error.response.data.message) {
        alert(`⚠️ ${error.response.data.message}`);
      } else if (error.request) {
        alert('❌ Network Error: Please check your internet connection or try again later.');
      } else {
        alert('❌ Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 min-h-screen">
      <div className="bg-white bg-opacity-90 shadow-2xl p-14 rounded-3xl w-full max-w-md">
        <h2 className="drop-shadow-lg mb-6 font-extrabold text-4xl text-blue-900 text-center leading-tight">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg focus:ring-4 focus:ring-blue-300 w-full font-bold text-white transform transition-all hover:scale-105 focus:outline-none">
            Login
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? 
          <button 
            onClick={() => navigate('/register')} 
            className="font-bold text-blue-500 hover:underline">
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

