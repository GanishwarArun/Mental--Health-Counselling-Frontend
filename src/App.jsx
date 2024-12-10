// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';

// import axios from 'axios';

// const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(' http://localhost:5000/api/user/register', userData);
//     console.log('User registered successfully:', response.data);
//   } catch (error) {
//     console.error('Error registering user:', error);
//   }
// };
// const App = () => {
//   return (
//     <BrowserRouter
//       // Apply the future flags here for React Router v7 features
//       future={{
//         v7_startTransition: true, // Opt-in to React Router v7 transition behavior
//         v7_relativeSplatPath: true, // Opt-in to relative splat path resolution
//       }}
//     >
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import Navbar from './components/Navbar';
import './index.css'; // Ensure Tailwind CSS is correctly configured.
import './/output.css';

const App = () => {
  return (
    <Router>
      {/* Navbar Component */}
      <Navbar />
      <main className="mx-auto p-4 container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

