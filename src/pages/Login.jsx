import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the auth context

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Send POST request to login the user
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update authentication context
      login(response.data); // Assuming response.data contains user information

      alert("✅ Login successful!");
      console.log("User Logged In:", response.data);

      // Navigate to the dashboard page after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error logging in:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`⚠️ ${error.response.data.message}`);
      } else if (error.request) {
        alert(
          "❌ Network Error: Please check your internet connection or try again later."
        );
      } else {
        alert("❌ Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700 text-lg"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700 text-lg"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none`}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg focus:ring-4 focus:ring-blue-300 w-full font-bold text-white transform transition-all ${
              !isLoading && "hover:scale-105"
            } focus:outline-none ${
              isLoading && "opacity-75 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-bold text-blue-500 hover:underline ml-1"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();  // Initialize the navigate function

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle login form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Send POST request to login the user
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, formData, {
//         headers: {
//           'Content-Type': 'application/json',  // Ensure correct content type
//         },
//       });
//       alert('✅ Login successful!');
//       console.log('User Logged In:', response.data);

//       // Navigate to the dashboard page after successful login
//       navigate('/dashboard');  // Redirects the user to the dashboard page
//     } catch (error) {
//       console.error('❌ Error logging in:', error);
//       // Check for specific error message from the server
//       if (error.response && error.response.data && error.response.data.message) {
//         alert(`⚠️ ${error.response.data.message}`);
//       } else if (error.request) {
//         alert('❌ Network Error: Please check your internet connection or try again later.');
//       } else {
//         alert('❌ Login failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 min-h-screen">
//       <div className="bg-white bg-opacity-90 shadow-2xl p-14 rounded-3xl w-full max-w-md">
//         <h2 className="drop-shadow-lg mb-6 font-extrabold text-4xl text-blue-900 text-center leading-tight">
//           Login to Your Account
//         </h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 text-lg">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 text-lg">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg focus:ring-4 focus:ring-blue-300 w-full font-bold text-white transform transition-all hover:scale-105 focus:outline-none">
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?
//           <button
//             onClick={() => navigate('/register')}
//             className="font-bold text-blue-500 hover:underline">
//             Register Here
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
