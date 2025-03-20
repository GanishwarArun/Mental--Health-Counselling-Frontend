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
import PayPalIntegration from './pages/PayPalButton';  
import DoctorAdvice from './pages/DoctorAdvice';
import Navbar from './components/Navbar';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

import './index.css';
import './output.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
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
            <Route path="/Zoom Meeting" element={<ZoomMeeting />} />{" "}
            {/* Changed to lowercase for consistency */}
            <Route path="/email" element={<Email />} />
            <Route path="/paypal" element={<PayPalIntegration />} />{" "}
            {/* Changed to lowercase for consistency */}
            <Route path="/doctor-advice" element={<DoctorAdvice />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
