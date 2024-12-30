import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import Chat from './pages/Chat';
import ZoomMeeting from './pages/ZoomMeeting';
import Email from './pages/Email';
import PayPalIntegration from './pages/PayPalButton';  // Corrected import to .js extension
import DoctorAdvice from './pages/DoctorAdvice';
import Navbar from './components/Navbar';
import './index.css';
import './output.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="mx-auto p-4 container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/Zoom Meeting" element={<ZoomMeeting />} /> {/* Changed to lowercase for consistency */}
          <Route path="/email" element={<Email />} />
          <Route path="/paypal" element={<PayPalIntegration />} /> {/* Changed to lowercase for consistency */}
          <Route path="/doctor-advice" element={<DoctorAdvice />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AppointmentBooking from './pages/AppointmentBooking';
// import Chat from './pages/Chat';
// import ZoomMeeting from './pages/ZoomMeeting';
// import Email from './pages/Email'; // Corrected import statement
// import PayPalButton from './pages/PayPalButton.jsx';
// import DoctorAdvice from './pages/DoctorAdvice';
// import Navbar from './components/Navbar';
// import './index.css';
// import './output.css';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <main className="mx-auto p-4 container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/book-appointment" element={<AppointmentBooking />} />
//           <Route path="/chat" element={<Chat />} />
//           <Route path="/ZoomMeeting" element={<ZoomMeeting />} />
//           <Route path="/email" element={<Email />} /> {/* Corrected email path */}
//           <Route path="/PayPalButton" element={<PayPalButton />} />
//           <Route path="/doctor-advice" element={<DoctorAdvice />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;

// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AppointmentBooking from './pages/AppointmentBooking';
// import Chat from './pages/Chat';
// import VideoCall from './pages/VideoCall';
// import Email from './pages/Email';
// import Payment from './pages/Pay';
// import DoctorAdvice from './pages/DoctorAdvice'; // Import DoctorAdvice page
// import Navbar from './components/Navbar';
// import './index.css'; // Ensure Tailwind CSS is correctly configured
// import './output.css'; // Additional custom CSS styles

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <main className="mx-auto p-4 container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/book-appointment" element={<AppointmentBooking />} />
//           <Route path="/chat" element={<Chat />} /> {/* Chat Functionality */}
//           <Route path="/video-call" element={<VideoCall />} /> {/* Zoom Video Call Integration */}
//           <Route path="/Email" element={<Email />} /> {/* Email Sending Form */}
//           <Route path="/payment" element={<Payment />} /> {/* Payment with PayPal */}
//           <Route path="/doctor-advice" element={<DoctorAdvice />} /> {/* Doctor Advice Page */}
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;
