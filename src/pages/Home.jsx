import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get authentication status

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-100 via-sky-200 to-blue-100 p-8 min-h-screen">
      <div className="bg-white bg-opacity-90 shadow-2xl p-16 rounded-3xl max-w-xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="drop-shadow-lg mb-6 font-extrabold text-6xl text-blue-900 leading-tight">
            Welcome to the Online Counseling Platform
          </h1>
          <p className="mb-8 font-medium text-gray-700 text-xl">
            Discover the perfect counselor to guide you toward mental wellness.
            Take the first step to a brighter future.
          </p>
        </div>

        {/* Action Buttons */}
        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate("/register")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-4 rounded-full focus:ring-4 focus:ring-blue-300 font-bold text-white text-xl transform transition-transform hover:scale-105 focus:outline-none"
            >
              Register Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex-1 bg-white hover:bg-gray-50 shadow-lg px-8 py-4 rounded-full border-2 border-blue-600 focus:ring-4 focus:ring-blue-300 font-bold text-blue-600 text-xl transform transition-transform hover:scale-105 focus:outline-none"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="text-center mb-12">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg px-12 py-4 rounded-full focus:ring-4 focus:ring-blue-300 font-bold text-white text-xl transform transition-transform hover:scale-105 focus:outline-none"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Professional Counselors"
            description="Connect with licensed and experienced mental health professionals."
            icon="👨‍⚕️"
          />
          <FeatureCard
            title="Secure Sessions"
            description="Private and confidential online counseling sessions."
            icon="🔒"
          />
          <FeatureCard
            title="Flexible Scheduling"
            description="Book appointments at times that work best for you."
            icon="📅"
          />
          <FeatureCard
            title="24/7 Support"
            description="Access to support resources whenever you need them."
            icon="💬"
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center gap-8 flex-wrap">
            <TrustIndicator number="1000+" label="Active Users" />
            <TrustIndicator number="50+" label="Counselors" />
            <TrustIndicator number="4.9/5" label="User Rating" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 bg-blue-50 rounded-xl hover:shadow-md transition-shadow">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TrustIndicator = ({ number, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-blue-900">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default Home;

