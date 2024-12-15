import React, { useState } from 'react';

const doctorsList = [
  { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Dermatologist' },
  { id: 3, name: 'Dr. Emily Brown', specialty: 'Psychologist' },
  { id: 4, name: 'Dr. Michael Davis', specialty: 'General Physician' },
];

function DoctorAdvice() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [adviceResponses, setAdviceResponses] = useState([]);

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  // Handle message change
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDoctor || !userMessage) {
      alert('Please select a doctor and write a message.');
      return;
    }

    // Simulated response from doctor
    const simulatedResponse = {
      doctor: selectedDoctor,
      userMessage: userMessage,
      doctorResponse: `Thank you for reaching out. We recommend you to follow a healthy lifestyle. — ${selectedDoctor}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add the simulated response to the advice responses
    setAdviceResponses([simulatedResponse, ...adviceResponses]);

    // Clear the form
    setSelectedDoctor('');
    setUserMessage('');
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-8 min-h-screen">
      <div className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md">
        <h2 className="mb-8 font-extrabold text-4xl text-blue-900 text-center">Doctor Advice</h2>

        {/* Form to submit a message to the doctor */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="doctor-select" className="block mb-2 font-semibold text-gray-700">Select a Doctor:</label>
            <select 
              id="doctor-select" 
              value={selectedDoctor} 
              onChange={handleDoctorChange} 
              className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none" 
              required
            >
              <option value="">-- Choose a Doctor --</option>
              {doctorsList.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} — {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="user-message" className="block mb-2 font-semibold text-gray-700">Your Message:</label>
            <textarea 
              id="user-message" 
              value={userMessage} 
              onChange={handleMessageChange} 
              className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none" 
              rows="4" 
              placeholder="Type your message to the doctor here..." 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg focus:ring-4 focus:ring-blue-300 w-full font-bold text-white transform transition-transform hover:scale-105 focus:outline-none"
          >
            Submit
          </button>
        </form>

        {/* Display the list of advice responses */}
        <div className="advice-responses">
          <h3 className="mb-4 font-bold text-blue-900 text-xl">Your Advice Responses</h3>

          {adviceResponses.length === 0 && (
            <p className="text-gray-700">No advice received yet. Send a message to get a response.</p>
          )}

          {adviceResponses.map((response, index) => (
            <div key={index} className="border-gray-300 bg-blue-50 mb-4 p-4 border rounded-lg">
              <p><strong>Doctor:</strong> {response.doctor}</p>
              <p><strong>Your Message:</strong> {response.userMessage}</p>
              <p><strong>Doctor's Advice:</strong> {response.doctorResponse}</p>
              <p className="text-gray-500 text-sm">Sent at: {response.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorAdvice;

