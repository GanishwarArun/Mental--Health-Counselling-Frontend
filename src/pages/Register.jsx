import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();  // Initialize the navigate function

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to register the user
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'application/json',  // Ensure correct content type
        },
      });
      alert('✅ Registration successful!');
      console.log('User Registered:', response.data);

      // Navigate to the login page after successful registration
      navigate('/login');  // Redirects the user to the login page
    } catch (error) {
      console.error('❌ Error registering user:', error);
      // Check for specific error message from the server
      if (error.response && error.response.data && error.response.data.message) {
        alert(`⚠️ ${error.response.data.message}`);
      } else if (error.request) {
        alert('❌ Network Error: Please check your internet connection or try again later.');
      } else {
        alert('❌ Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 min-h-screen">
      <div className="bg-white bg-opacity-90 shadow-2xl p-16 rounded-3xl w-full max-w-md">
        <h2 className="drop-shadow-lg mb-8 font-extrabold text-4xl text-blue-900 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-800">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg py-3 rounded-lg w-full font-bold text-white transform transition-all hover:scale-105">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
  
//   const navigate = useNavigate();  // Initialize the navigate function

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle registration form submission
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Send POST request to register the user
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, formData, {
//         headers: {
//           'Content-Type': 'application/json',  // Ensure correct content type
//         },
//       });
//       alert('✅ Registration successful!');
//       console.log('User Registered:', response.data);

//       // Navigate to the login page after successful registration
//       navigate('/login');  // Redirects the user to the login page
//     } catch (error) {
//       console.error('❌ Error registering user:', error);
//       // Check for specific error message from the server
//       if (error.response && error.response.data && error.response.data.message) {
//         alert(`⚠️ ${error.response.data.message}`);
//       } else if (error.request) {
//         alert('❌ Network Error: Please check your internet connection or try again later.');
//       } else {
//         alert('❌ Registration failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-16 rounded-3xl w-full max-w-md">
//         <h2 className="drop-shadow-lg mb-8 font-extrabold text-4xl text-blue-900 text-center">Register</h2>
//         <form onSubmit={handleRegister}>
//           <div className="mb-6">
//             <label htmlFor="name" className="block mb-2 font-medium text-gray-800">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="email" className="block mb-2 font-medium text-gray-800">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2 font-medium text-gray-800">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             className="bg-blue-600 hover:bg-blue-700 shadow-lg py-3 rounded-lg w-full font-bold text-white transform transition-all hover:scale-105">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

