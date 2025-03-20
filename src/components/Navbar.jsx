import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { isAuthenticated, logout } = useAuth(); // Use the auth context
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

    const handleLogout = () => {
      logout(); 
      navigate("/");
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
        <ul
          className={`
          md:flex md:items-center md:space-x-6 
          absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto 
          bg-gradient-to-r from-blue-500 to-indigo-600 md:bg-transparent 
          text-white md:flex-row flex-col md:h-auto transition-all duration-300 
          ${isMobileMenuOpen ? "block" : "hidden"} md:block 
        `}
        >
          <li className="p-2 md:p-0 transition-transform hover:scale-110">
            <Link to="/" className="font-semibold text-lg">
              Home
            </Link>
          </li>
          {!isAuthenticated ? (
            // Show these items when user is NOT authenticated
            <>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/register" className="font-semibold text-lg">
                  Register
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/login" className="font-semibold text-lg">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/dashboard" className="font-semibold text-lg">
                  Dashboard
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/book-appointment" className="font-semibold text-lg">
                  Book Appointment
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/chat" className="font-semibold text-lg">
                  Chat
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/Zoom Meeting" className="font-semibold text-lg">
                  Zoom Meeting
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/email" className="font-semibold text-lg">
                  Email
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/doctor-advice" className="font-semibold text-lg">
                  Doctor Advice
                </Link>
              </li>
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <Link to="/paypal" className="font-semibold text-lg">
                  Paypal
                </Link>
              </li>
              {/* Added Logout button */}
              <li className="p-2 md:p-0 transition-transform hover:scale-110">
                <button
                  onClick={handleLogout}
                  className="font-semibold text-lg text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
