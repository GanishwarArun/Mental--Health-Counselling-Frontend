import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // 📝 Handles input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Handles form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // 🛠️ Validate form inputs
    if (!formData.email || !formData.password) {
      alert('⚠️ Please enter both email and password.');
      return;
    }

    try {
      console.log('🔗 API Base URL:', import.meta.env.VITE_API_BASE_URL);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ Login successful!');
      console.log('Login Response:', response.data);

      // 🛠️ Check if the token is available in the response
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token); // 🎉 Store the token in local storage
      } else {
        console.warn('⚠️ Token not found.');
      }

      // 🔀 Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Full error:', error);

      // 🛠️ Check for errors in the response
      if (error.response) {
        console.error('❌ Server Response:', error.response.data);
        alert(`⚠️ ${error.response.data.message || 'Login failed. Please try again.'}`);
      } else if (error.request) {
        console.error('❌ No response received:', error.request);
        alert('❌ Network error: Please check your internet connection.');
      } else {
        console.error('❌ Setup error:', error.message);
        alert('❌ An error occurred while logging in.');
      }
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

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission for login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Check if both fields are filled
//     if (!formData.email || !formData.password) {
//       alert('⚠️ Please enter your email and password.');
//       return;
//     }

//     try {
//       // Log the API URL to ensure it's correct
//       console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

//       // Make the API request
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/login`, // Ensure the API base URL is correct
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       alert('✅ Login successful!');
//       console.log('Login Response:', response.data);

//       // Check if the token is returned and store it
//       if (response.data && response.data.token) {
//         localStorage.setItem('authToken', response.data.token); // Store the token in localStorage
//       } else {
//         console.warn('⚠️ No token received in response');
//       }

//       // Redirect to the dashboard or another page
//       navigate('/dashboard');

//     } catch (error) {
//       console.error('❌ Full Error Object:', error); // Full error log for debugging
      
//       if (error.response) {
//         console.error('❌ Response Data:', error.response.data); // Server error (like validation, auth issues)
//         alert(`⚠️ ${error.response.data.message || 'Login failed. Please try again.'}`);
//       } else if (error.request) {
//         console.error('❌ No Response:', error.request); // No response from server
//         alert('❌ Network Error: Please check your internet connection or try again later.');
//       } else {
//         console.error('❌ Unexpected Error:', error.message); // Any other errors (like axios setup issues)
//         alert('❌ An error occurred during login. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="mb-4 font-bold text-2xl">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <button 
//           type="submit" 
//           className="bg-blue-500 px-4 py-2 rounded text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate(); // Hook to navigate after successful login

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission for login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Simple validation: Ensure both fields are filled
//     if (!formData.email || !formData.password) {
//       alert('⚠️ Please fill in both fields.');
//       return;
//     }

//     try {
//       // Make the API request
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/login`,  // Ensure the API base URL is correctly set
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',  // Ensure the correct content type is set
//           },
//         }
//       );

//       alert('✅ Login successful!');
//       console.log('Login Response:', response.data);

//       // Check if the token is returned in the response and store it
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token); // Store the token in localStorage
//       }

//       // Redirect the user to the dashboard or a protected route
//       navigate('/dashboard');  // Replace '/dashboard' with your protected route

//     } catch (error) {
//       console.error('❌ Error logging in:', error);

//       // Handle different error scenarios
//       if (error.response) {
//         // Server responded with a status code other than 2xx
//         alert(`⚠️ ${error.response.data.message || 'Login failed. Please try again.'}`);
//       } else if (error.request) {
//         // No response was received from the server
//         alert('❌ Network Error: Please check your internet connection or try again later.');
//       } else {
//         // Other errors, like issues with setting up the request
//         alert('❌ An error occurred during login. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="mb-4 font-bold text-2xl">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate(); // Hook to navigate after successful login

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/login`, 
//         formData, 
//         {
//           headers: {
//             'Content-Type': 'application/json',  // Ensure correct content type
//           },
//         }
//       );
//       alert('✅ Login successful!');
//       console.log('Login Response:', response.data);

//       // Save the token (if you have one) to localStorage or context
//       localStorage.setItem('authToken', response.data.token); // Example of saving the token

//       // Redirect the user to the dashboard or a protected page
//       navigate('/dashboard'); // Replace '/dashboard' with your protected route
//     } catch (error) {
//       console.error('❌ Error logging in:', error);

//       // Check for specific error response or network issues
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         alert(`⚠️ ${error.response.data.message || 'Login failed. Please try again.'}`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         alert('❌ Network Error: Please check your internet connection or try again later.');
//       } else {
//         // Something went wrong with the request setup
//         alert('❌ An error occurred during login. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="mb-4 font-bold text-2xl">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-4 p-2 border w-full"
//         />
//         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

