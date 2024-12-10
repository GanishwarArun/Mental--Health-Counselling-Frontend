import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Used to navigate between pages

  const handleGetStarted = () => {
    navigate('/register'); // Redirects to the register page
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 p-8 min-h-screen">
      <div className="bg-white bg-opacity-95 shadow-xl p-14 rounded-3xl max-w-xl text-center">
        <h1 className="mb-6 font-extrabold text-5xl text-amber-800 leading-tight">
          Welcome to the Online Counseling Platform
        </h1>
        <p className="mb-8 text-gray-800 text-lg">
          Discover the perfect counselor to guide you toward mental wellness. Take the first step to a brighter future.
        </p>
        <button 
          onClick={handleGetStarted}
          className="bg-amber-500 hover:bg-amber-600 shadow-md px-12 py-4 rounded-full focus:ring-4 focus:ring-amber-200 font-bold text-lg text-white transform transition-transform hover:scale-105 focus:outline-none">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate(); // Used to navigate between pages

//   const handleGetStarted = () => {
//     navigate('/register'); // Redirects to the register page
//   };

//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 via-teal-100 to-green-100 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-95 shadow-xl p-14 rounded-3xl max-w-xl text-center">
//         <h1 className="mb-6 font-extrabold text-5xl text-teal-700 leading-tight">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="mb-8 text-gray-800 text-lg">
//           Discover the perfect counselor to guide you toward mental wellness. Take the first step to a brighter future.
//         </p>
//         <button 
//           onClick={handleGetStarted}
//           className="bg-teal-500 hover:bg-teal-600 shadow-md px-12 py-4 rounded-full focus:ring-4 focus:ring-teal-200 font-bold text-lg text-white transform transition-transform hover:scale-105 focus:outline-none">
//           Get Started
//         </button>
//       </div>
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
//     <div className="flex justify-center items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-14 rounded-3xl max-w-xl text-center">
//         <h1 className="mb-6 font-extrabold text-6xl text-yellow-600 leading-tight">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="mb-8 text-gray-900 text-xl">
//           Discover the perfect counselor to guide you toward mental wellness. Take the first step to a brighter future.
//         </p>
//         <button 
//           onClick={handleGetStarted}
//           className="bg-yellow-500 hover:bg-yellow-600 shadow-lg px-12 py-4 rounded-full focus:ring-4 focus:ring-yellow-300 font-bold text-lg text-white transform transition-transform hover:scale-110 focus:outline-none">
//           Get Started
//         </button>
//       </div>
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
//     <div className="flex justify-center items-center bg-gradient-to-r from-indigo-900 via-sky-700 to-teal-500 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-95 shadow-2xl p-12 rounded-3xl max-w-lg text-center">
//         <h1 className="mb-6 font-extrabold text-5xl text-teal-700 leading-tight">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="mb-8 text-gray-800 text-lg">
//           Discover the perfect counselor to guide you toward mental wellness. Take the first step to a better you.
//         </p>
//         <button 
//           onClick={handleGetStarted}
//           className="bg-teal-600 hover:bg-teal-700 shadow-md px-8 py-3 rounded-full focus:ring-4 focus:ring-teal-300 font-semibold text-lg text-white transform transition-transform hover:scale-105 focus:outline-none">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-purple-800 via-violet-600 to-fuchsia-500 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-12 rounded-3xl max-w-lg text-center">
//         <h1 className="mb-6 font-extrabold text-5xl text-fuchsia-700 leading-tight">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="mb-8 text-gray-800 text-lg">
//           Discover the perfect counselor to guide you toward mental wellness. Take the first step to a better you.
//         </p>
//         <button 
//           className="bg-fuchsia-600 hover:bg-fuchsia-700 shadow-md px-8 py-3 rounded-full focus:ring-4 focus:ring-fuchsia-300 font-semibold text-lg text-white transform transition-transform hover:scale-105 focus:outline-none">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-500 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-12 rounded-2xl text-center">
//         <h1 className="mb-6 font-extrabold text-5xl text-teal-700">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="text-gray-800 text-xl">
//           Find the perfect counselor for your needs and achieve peace of mind and mental well-being.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-80 shadow-lg p-10 rounded-xl text-center">
//         <h1 className="mb-4 font-bold text-4xl text-gray-800">
//           Welcome to the Online Counseling Platform
//         </h1>
//         <p className="text-gray-700 text-lg">
//           Find the right counselor for your needs and achieve mental well-being with ease.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="p-8 text-center">
//       <h1 className="font-bold text-4xl">Welcome to the Online Counseling Platform</h1>
//       <p className="mt-4">Find the right counselor for your needs.</p>
//     </div>
//   );
// };

// export default Home;
