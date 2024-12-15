import React, { useState } from 'react';

function Email() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    console.log('Email Sent:', { email, subject, message });
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 p-8 min-h-screen">
      <div className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md">
        <h2 className="mb-8 font-extrabold text-4xl text-center text-indigo-900">Send an Email</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700 text-lg">Recipient's Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter recipient's email" 
            className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full focus:outline-none" 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="subject" className="block mb-2 font-medium text-gray-700 text-lg">Subject</label>
          <input 
            type="text" 
            id="subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            placeholder="Enter email subject" 
            className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full focus:outline-none" 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 font-medium text-gray-700 text-lg">Message</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Enter your message" 
            rows="5" 
            className="border-gray-300 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full focus:outline-none resize-none"
          />
        </div>

        <button 
          onClick={sendEmail} 
          className="bg-indigo-500 hover:bg-indigo-600 py-4 rounded-lg focus:ring-4 focus:ring-indigo-300 w-full font-bold text-white transform transition-transform hover:scale-105 focus:outline-none"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default Email;

