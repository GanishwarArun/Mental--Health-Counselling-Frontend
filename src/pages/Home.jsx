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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link for navigation

// const Home = () => {
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Fetch the message from the backend
//     const fetchMessage = async () => {
//       try {
//         const response = await axios.get('/api/home'); // Assuming your API is running locally
//         setMessage(response.data.message);
//       } catch (error) {
//         setErrorMessage('Failed to load message');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessage();
//   }, []);

//   return (
//     <div>
//       <h1>Home Page</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : errorMessage ? (
//         <p style={{ color: 'red' }}>{errorMessage}</p>
//       ) : (
//         <p>{message}</p>
//       )}

//       {/* Navigation Links */}
//       <div>
//         <Link to="/register">Sign-In</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const response = await axios.get('/api/home');
//         setMessage(response.data.message);  // Set the message from the backend
//       } catch (error) {
//         console.error('Failed to fetch home message:', error);
//         setMessage('Error loading home message.');
//       }
//     };

//     fetchMessage();
//   }, []);

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Home;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate(); // Used to navigate between pages

//   const handleGetStarted = () => {
//     navigate('/register'); // Redirects to the register page
//   };

//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-sky-100 via-sky-200 to-blue-100 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-16 rounded-3xl max-w-xl text-center">
//         <h1 className="drop-shadow-lg mb-6 font-extrabold text-6xl text-blue-900 leading-tight">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="mb-8 font-medium text-gray-700 text-xl">
//           Discover the perfect counselor to guide you toward mental wellness. Take the first step to a brighter future.
//         </p>
//         <button 
//           onClick={handleGetStarted}
//           className="bg-blue-600 hover:bg-blue-700 shadow-lg px-12 py-4 rounded-full focus:ring-4 focus:ring-blue-300 font-bold text-white text-xl transform transition-transform hover:scale-105 focus:outline-none">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

