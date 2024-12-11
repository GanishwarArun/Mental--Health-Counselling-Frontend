import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

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
    <div className="shadow-lg mx-auto mt-10 p-8 border rounded max-w-md">
      <h2 className="mb-6 font-bold text-3xl text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="border-gray-300 p-3 border rounded w-full"
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded w-full font-bold text-white transition duration-200">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

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
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, formData); // Update the endpoint to use .env variable
//       alert('✅ Registration successful!');
//       console.log('User Registered:', response.data);
      
//       // Navigate to the login page after successful registration
//       navigate('/login');  // Redirects the user to the login page
//     } catch (error) {
//       console.error('❌ Error registering user:', error);
//       // Check for specific error message from the server
//       if (error.response && error.response.data && error.response.data.message) {
//         alert(`⚠️ ${error.response.data.message}`);
//       } else {
//         alert('❌ Registration failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="shadow-lg mx-auto mt-10 p-8 border rounded max-w-md">
//       <h2 className="mb-6 font-bold text-3xl text-center">Register</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-2 font-medium">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border-gray-300 p-3 border rounded w-full"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-2 font-medium">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border-gray-300 p-3 border rounded w-full"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="password" className="block mb-2 font-medium">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border-gray-300 p-3 border rounded w-full"
//           />
//         </div>
        
//         <button 
//           type="submit" 
//           className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded w-full font-bold text-white transition duration-200">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

// // const Register = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //   });
  
// //   const navigate = useNavigate();  // Initialize the navigate function

// //   // Handle form input changes
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Handle registration form submission
// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Send POST request to register the user
// //       const response = await axios.post('http://localhost:5000/api/register', formData);
// //       alert('✅ Registration successful!');
// //       console.log('User Registered:', response.data);
      
// //       // Navigate to the login page after successful registration
// //       navigate('/login');  // Redirects the user to the login page
// //     } catch (error) {
// //       console.error('❌ Error registering user:', error);
// //       // Check for specific error message from the server
// //       if (error.response && error.response.data && error.response.data.message) {
// //         alert(`⚠️ ${error.response.data.message}`);
// //       } else {
// //         alert('❌ Registration failed. Please try again.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="shadow-lg mx-auto mt-10 p-8 border rounded max-w-md">
// //       <h2 className="mb-6 font-bold text-3xl text-center">Register</h2>
// //       <form onSubmit={handleRegister}>
// //         <div className="mb-4">
// //           <label htmlFor="name" className="block mb-2 font-medium">Name</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             placeholder="Enter your name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="border-gray-300 p-3 border rounded w-full"
// //           />
// //         </div>
        
// //         <div className="mb-4">
// //           <label htmlFor="email" className="block mb-2 font-medium">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             placeholder="Enter your email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="border-gray-300 p-3 border rounded w-full"
// //           />
// //         </div>
        
// //         <div className="mb-4">
// //           <label htmlFor="password" className="block mb-2 font-medium">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             placeholder="Enter your password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="border-gray-300 p-3 border rounded w-full"
// //           />
// //         </div>
        
// //         <button 
// //           type="submit" 
// //           className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded w-full font-bold text-white transition duration-200">
// //           Register
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;

// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

// // // const Register = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });
  
// // //   const navigate = useNavigate();  // Initialize the navigate function

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post('http://localhost:5000/api/user/register', formData);
// // //       alert('Registration successful!');
// // //       console.log(response.data);
      
// // //       // Navigate to the login page after successful registration
// // //       navigate('/login');  // Redirects the user to the login page
// // //     } catch (error) {
// // //       console.error('Error registering user:', error);
// // //       alert('Registration failed. Please try again.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="mb-4 font-bold text-2xl">Register</h2>
// // //       <form onSubmit={handleRegister}>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           placeholder="Name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email"
// // //           value={formData.email}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="password"
// // //           name="password"
// // //           placeholder="Password"
// // //           value={formData.password}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Register;

// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// // // const Register = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });
// // //   const navigate = useNavigate(); // Initialize useNavigate hook

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post('http://localhost:5000/api/user/register', formData);
// // //       alert('Registration successful!');
// // //       console.log(response.data);
// // //       // Navigate to the login page after successful registration
// // //       navigate('/login'); // Redirect to /login
// // //     } catch (error) {
// // //       console.error('Error registering user:', error);
// // //       alert('Registration failed. Please try again.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="mb-4 font-bold text-2xl">Register</h2>
// // //       <form onSubmit={handleRegister}>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           placeholder="Name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email"
// // //           value={formData.email}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="password"
// // //           name="password"
// // //           placeholder="Password"
// // //           value={formData.password}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Register;

// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // const Register = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       // Use formData to get the values
// // //       const { name, email, password } = formData;
// // //       const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      
// // //       alert('Registration successful!');
// // //       console.log(response.data);
// // //     } catch (error) {
// // //       console.error('Error registering user:', error);
// // //       alert('Registration failed. Please try again.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="mb-4 font-bold text-2xl">Register</h2>
// // //       <form onSubmit={handleRegister}>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           placeholder="Name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email"
// // //           value={formData.email}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="password"
// // //           name="password"
// // //           placeholder="Password"
// // //           value={formData.password}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Register;

// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // const Register = () => {
// // //     const [name, setName] = useState('');
// // //     const [email, setEmail] = useState('');
// // //     const [password, setPassword] = useState('');

// // //     const handleRegister = async (e) => {
// // //         e.preventDefault();
// // //         try {
// // //             const response = await axios.post('http://localhost:5000/api/users/register', {
// // //                 name,
// // //                 email,
// // //                 password
// // //             });
// // //             console.log('✅ Registration successful:', response.data);
// // //         } catch (error) {
// // //             console.error('❌ Error registering user:', error);
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Register</h1>
// // //             <form onSubmit={handleRegister}>
// // //                 <input
// // //                     type="text"
// // //                     placeholder="Name"
// // //                     value={name}
// // //                     onChange={(e) => setName(e.target.value)}
// // //                 />
// // //                 <input
// // //                     type="email"
// // //                     placeholder="Email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                 />
// // //                 <input
// // //                     type="password"
// // //                     placeholder="Password"
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                 />
// // //                 <button type="submit">Register</button>
// // //             </form>
// // //         </div>
// // //     );
// // // };

// // // export default Register;


// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // const Register = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post(' http://localhost:5000/api/user/register', { name, email, password });
// // //       alert('Registration successful!');
// // //       console.log(response.data);
// // //     } catch (error) {
// // //       console.error('Error registering user:', error);
// // //       alert('Registration failed. Please try again.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="mb-4 font-bold text-2xl">Register</h2>
// // //       <form onSubmit={handleRegister}>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           placeholder="Name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email"
// // //           value={formData.email}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <input
// // //           type="password"
// // //           name="password"
// // //           placeholder="Password"
// // //           value={formData.password}
// // //           onChange={handleChange}
// // //           className="mb-4 p-2 border w-full"
// // //         />
// // //         <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Register;

