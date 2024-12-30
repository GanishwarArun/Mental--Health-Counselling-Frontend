import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4">
      <div className="flex justify-between items-center mx-auto container">
        {/* Logo */}
        <h1 className="font-extrabold text-2xl text-white">Counseling App</h1>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl text-white focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Items */}
        <ul className={`
          md:flex md:items-center md:space-x-6 
          absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto 
          bg-gradient-to-r from-blue-500 to-indigo-600 md:bg-transparent 
          text-white md:flex-row flex-col md:h-auto transition-all duration-300 
          ${isMobileMenuOpen ? 'block' : 'hidden'} md:block 
        `}>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/" className="font-semibold text-lg">Home</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/register" className="font-semibold text-lg">Register</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/login" className="font-semibold text-lg">Login</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/dashboard" className="font-semibold text-lg">Dashboard</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/book-appointment" className="font-semibold text-lg">Book Appointment</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/chat" className="font-semibold text-lg">Chat</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/Zoom Meeting" className="font-semibold text-lg">Zoom Meeting</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/email" className="font-semibold text-lg">Email</Link>
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/doctor-advice" className="font-semibold text-lg">Doctor Advice</Link> 
          </li>
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/paypal" className="font-semibold text-lg">Paypal</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
