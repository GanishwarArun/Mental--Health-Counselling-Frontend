import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      alert('Login successful!');
      console.log(response.data);
      // Handle login (e.g., save token, redirect user)
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 font-bold text-2xl">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
