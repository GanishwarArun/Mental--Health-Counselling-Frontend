import React, { useState } from 'react';

const GoogleMeet = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [userName, setUserName] = useState('');

  // Function to create Google Meet Link
  const generateMeetLink = () => {
    if (!userName.trim()) {
      alert('Please enter your name to create a meeting link.');
      return;
    }

    // You can generate the Google Meet link directly by appending the user name in the query parameters
    // Here we are assuming the user creates a unique meeting by adding their name in the URL
    const baseUrl = "https://meet.google.com/new"; // Google Meet new meeting URL
    const link = `${baseUrl}?authuser=${userName}`;
    setMeetingLink(link);
  };

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-200 p-8 min-h-screen">
      <h1 className="mb-6 font-bold text-4xl text-blue-800 text-center">Google Meet Integration</h1>
      
      {/* Form to Enter User Name */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full max-w-sm focus:outline-none"
        />
      </div>

      {/* Generate Google Meet Link Button */}
      <button
        onClick={generateMeetLink}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full focus:ring-4 focus:ring-blue-300 font-semibold text-white transform transition-transform hover:scale-105"
      >
        Generate Google Meet Link
      </button>

      {/* Display the Generated Meeting Link */}
      {meetingLink && (
        <div className="mt-6 text-center">
          <p className="font-semibold text-blue-700 text-lg">Your Google Meet Link:</p>
          <a 
            href={meetingLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-2 text-blue-600 hover:text-blue-800"
          >
            {meetingLink}
          </a>
        </div>
      )}

      {/* Informational Message */}
      <div className="mt-8 text-center text-gray-600">
        <p>Click the link to join your Google Meet video call.</p>
      </div>
    </div>
  );
};

export default GoogleMeet;

