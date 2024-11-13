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

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AppointmentBooking from './pages/AppointmentBooking';
// import Navbar from './components/Navbar';
// import './index.css';


// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/book-appointment" element={<AppointmentBooking />} />
//       </Routes>
//     </Router>
//   // );
// };

// export default App;


// // import React from 'react';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR.
// //         </p>
// //         <span>
// //           <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
// //             Vite
// //           </a>
// //           {' '}and{' '}
// //           <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
// //             React
// //           </a>
// //         </span>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

