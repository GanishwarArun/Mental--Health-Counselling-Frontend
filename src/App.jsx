import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import Chat from './pages/Chat';
import VideoCall from './pages/VideoCall';
import Email from './Pages/Email';
import Payment from './pages/Pay';
import DoctorAdvice from './pages/DoctorAdvice'; // Import DoctorAdvice page
import Navbar from './components/Navbar';
import './index.css'; // Ensure Tailwind CSS is correctly configured
import './output.css'; // Additional custom CSS styles

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
          <Route path="/chat" element={<Chat />} /> {/* Chat Functionality */}
          <Route path="/video-call" element={<VideoCall />} /> {/* Zoom Video Call Integration */}
          <Route path="/email" element={<Email />} /> {/* Email Sending Form */}
          <Route path="/payment" element={<Payment />} /> {/* Payment with PayPal */}
          <Route path="/doctor-advice" element={<DoctorAdvice />} /> {/* Doctor Advice Page */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
