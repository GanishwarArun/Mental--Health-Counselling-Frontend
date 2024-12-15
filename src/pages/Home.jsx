import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Used to navigate between pages

  const handleGetStarted = () => {
    navigate('/register'); // Redirects to the register page
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-100 via-sky-200 to-blue-100 p-8 min-h-screen">
      <div className="bg-white bg-opacity-90 shadow-2xl p-16 rounded-3xl max-w-xl text-center">
        <h1 className="drop-shadow-lg mb-6 font-extrabold text-6xl text-blue-900 leading-tight">
          Welcome to the Online Counseling Platform
        </h1>
        <p className="mb-8 font-medium text-gray-700 text-xl">
          Discover the perfect counselor to guide you toward mental wellness. Take the first step to a brighter future.
        </p>
        <button 
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 shadow-lg px-12 py-4 rounded-full focus:ring-4 focus:ring-blue-300 font-bold text-white text-xl transform transition-transform hover:scale-105 focus:outline-none">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

