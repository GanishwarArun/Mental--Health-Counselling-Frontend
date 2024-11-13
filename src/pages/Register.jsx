import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      alert('Registration successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 font-bold text-2xl">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

// import React from 'react';

// const Register = () => {
//   return (
//     <div className="p-8">
//       <h2 className="mb-4 font-bold text-2xl">Register</h2>
//       <form>
//         <input type="text" placeholder="Name" className="mb-4 p-2 border w-full" />
//         <input type="email" placeholder="Email" className="mb-4 p-2 border w-full" />
//         <input type="password" placeholder="Password" className="mb-4 p-2 border w-full" />
//         <button className="bg-blue-500 px-4 py-2 rounded text-white">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
