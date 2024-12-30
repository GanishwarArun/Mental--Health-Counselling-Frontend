import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      setErrorMessage('All fields are required!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_URL}/api/send-email`, { email, subject, message });

      if (response.data.success) {
        setSuccessMessage('Email sent successfully!');
        setEmail('');
        setSubject('');
        setMessage('');
        // Redirect to the Doctor Advice page after email is sent
        setTimeout(() => navigate('/paypal'), 1500); // Replace '/doctor-advice' with the correct route for the doctor advice page
      }
    } catch (error) {
      setErrorMessage('Failed to send email. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-10 min-h-screen text-gray-900">
      <div className="bg-white shadow-xl mx-auto p-8 rounded-xl max-w-2xl">
        <h1 className="mb-6 font-semibold text-4xl text-center text-gray-800">Send Email</h1>
        <Link to="/" className="block mb-6 text-blue-600 text-center text-lg hover:underline">Go to Home</Link>
        {successMessage && <p className="mb-4 font-semibold text-center text-green-600">{successMessage}</p>}
        {errorMessage && <p className="mb-4 font-semibold text-center text-red-600">{errorMessage}</p>}
        <form onSubmit={handleSendEmail}>
          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block font-semibold text-gray-700 text-lg">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block font-semibold text-gray-700 text-lg">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-xl text-white font-semibold rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const EmailForm = () => {
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();

//   const handleSendEmail = async (e) => {
//     e.preventDefault();

//     if (!email || !subject || !message) {
//       setErrorMessage('All fields are required!');
//       return;
//     }

//     setLoading(true);
//     setErrorMessage('');

//     try {
//       const API_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.post(`${API_URL}/api/send-email`, { email, subject, message });

//       if (response.data.success) {
//         setSuccessMessage('Email sent successfully!');
//         setEmail('');
//         setSubject('');
//         setMessage('');
//         // Redirect to the doctor page after email is sent
//         setTimeout(() => navigate('/doctor'), 1500); // Replace '/doctor' with the correct route for the doctor page
//       }
//     } catch (error) {
//       setErrorMessage('Failed to send email. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-10 min-h-screen text-gray-900">
//       <div className="bg-white shadow-xl mx-auto p-8 rounded-xl max-w-2xl">
//         <h1 className="mb-6 font-semibold text-4xl text-center text-gray-800">Send Email</h1>
//         <Link to="/" className="block mb-6 text-blue-600 text-center text-lg hover:underline">Go to Home</Link>
//         {successMessage && <p className="mb-4 font-semibold text-center text-green-600">{successMessage}</p>}
//         {errorMessage && <p className="mb-4 font-semibold text-center text-red-600">{errorMessage}</p>}
//         <form onSubmit={handleSendEmail}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block font-semibold text-gray-700 text-lg">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="subject" className="block font-semibold text-gray-700 text-lg">Subject</label>
//             <input
//               type="text"
//               id="subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="message" className="block font-semibold text-gray-700 text-lg">Message</label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter your message"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 text-xl text-white font-semibold rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Sending...' : 'Send Email'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmailForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const EmailForm = () => {
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();

//   const handleSendEmail = async (e) => {
//     e.preventDefault();

//     if (!email || !subject || !message) {
//       setErrorMessage('All fields are required!');
//       return;
//     }

//     setLoading(true);
//     setErrorMessage('');

//     try {
//       const API_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.post(`${API_URL}/api/send-email`, { email, subject, message });

//       if (response.data.success) {
//         setSuccessMessage('Email sent successfully!');
//         setEmail('');
//         setSubject('');
//         setMessage('');
//         setTimeout(() => navigate('/success'), 1500);
//       }
//     } catch (error) {
//       setErrorMessage('Failed to send email. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-10 min-h-screen text-gray-900">
//       <div className="bg-white shadow-xl mx-auto p-8 rounded-xl max-w-2xl">
//         <h1 className="mb-6 font-semibold text-4xl text-center text-gray-800">Send Email</h1>
//         <Link to="/" className="block mb-6 text-blue-600 text-center text-lg hover:underline">Go to Home</Link>
//         {successMessage && <p className="mb-4 font-semibold text-center text-green-600">{successMessage}</p>}
//         {errorMessage && <p className="mb-4 font-semibold text-center text-red-600">{errorMessage}</p>}
//         <form onSubmit={handleSendEmail}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block font-semibold text-gray-700 text-lg">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="subject" className="block font-semibold text-gray-700 text-lg">Subject</label>
//             <input
//               type="text"
//               id="subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="message" className="block font-semibold text-gray-700 text-lg">Message</label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter your message"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 text-xl text-white font-semibold rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Sending...' : 'Send Email'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmailForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const EmailForm = () => {
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();

//   const handleSendEmail = async (e) => {
//     e.preventDefault();

//     if (!email || !subject || !message) {
//       setErrorMessage('All fields are required!');
//       return;
//     }

//     setLoading(true);
//     setErrorMessage('');

//     try {
//       // Corrected API call
//       const API_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable for base URL
//       const response = await axios.post(`${API_URL}/api/send-email`, { email, subject, message });

//       if (response.data.success) {
//         setSuccessMessage('Email sent successfully!');
//         setEmail('');
//         setSubject('');
//         setMessage('');
//         setTimeout(() => navigate('/success'), 1500); // Navigate to success page
//       }
//     } catch (error) {
//       setErrorMessage('Failed to send email. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-10 min-h-screen text-gray-900">
//       <div className="bg-white shadow-xl mx-auto p-8 rounded-xl max-w-2xl">
//         <h1 className="mb-6 font-semibold text-4xl text-center text-gray-800">Send Email</h1>
//         <Link to="/" className="block mb-6 text-blue-600 text-center text-lg hover:underline">Go to Home</Link>
//         {successMessage && <p className="mb-4 font-semibold text-center text-green-600">{successMessage}</p>}
//         {errorMessage && <p className="mb-4 font-semibold text-center text-red-600">{errorMessage}</p>}
//         <form onSubmit={handleSendEmail}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block font-semibold text-gray-700 text-lg">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="subject" className="block font-semibold text-gray-700 text-lg">Subject</label>
//             <input
//               type="text"
//               id="subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="message" className="block font-semibold text-gray-700 text-lg">Message</label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter your message"
//               className="border-gray-300 shadow-md mt-2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-lg focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 text-xl text-white font-semibold rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Sending...' : 'Send Email'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmailForm;