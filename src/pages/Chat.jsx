import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the send button
  const [errorMessage, setErrorMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false); // Flag to track if the message has been sent
  const navigate = useNavigate();
  const location = useLocation();

  // Extract sender and receiver from query parameters
  const searchParams = new URLSearchParams(location.search);
  const sender = searchParams.get('sender') || 'Guest1'; // Default to 'Guest1' if not provided
  const receiver = searchParams.get('receiver') || 'Guest2'; // Default to 'Guest2' if not provided

  // Fetch API URL from environment variable using Vite's import.meta.env
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat`;


  // Debugging: Log the API URL to verify
  console.log("API URL:", API_URL);

  // Fetch chat messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(API_URL); // Fetch messages from backend
        if (response.data.success && Array.isArray(response.data.data)) {
          setMessages(response.data.data);
        } else {
          throw new Error('Invalid response from server.');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setErrorMessage('Failed to load messages. Please try again later.');
      }
    };

    fetchMessages();
  }, [API_URL]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Prevent empty messages

    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        message: newMessage,
        sender,
        receiver,
      });

      if (response.data.success) {
        setMessages((prevMessages) => [...prevMessages, response.data.data]);
        setNewMessage('');
        setErrorMessage('');
        setMessageSent(true); // Mark the message as sent
      } else {
        throw new Error(response.data.message || 'Message send failed.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to the Zoom meeting page
  const handleNavigateToZoom = () => {
    navigate('/Zoom Meeting'); // Replace '/zoom-meeting' with your actual Zoom meeting page route
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-6 min-h-screen">
      <div className="border-gray-200 bg-white shadow-lg p-6 border rounded-lg w-full max-w-2xl">
        <h1 className="mb-4 font-bold text-3xl text-center text-gray-900">Chat Room</h1>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 text-sm hover:text-blue-800 transition"
          >
            ⬅ Back to Home
          </button>
          <p className="text-gray-600 text-sm">
            Chatting with <strong className="text-gray-900">{receiver}</strong> as{' '}
            <strong className="text-gray-900">{sender}</strong>
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="mb-4 text-center text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Chat messages */}
        <div
          className="border-gray-300 bg-gray-50 p-4 border rounded-lg h-80 overflow-y-scroll"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages yet. Start the conversation!</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`p-3 rounded ${message.sender === sender ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
                >
                  <div>
                    <strong className="text-gray-900">{message.sender}:</strong>{' '}
                    <span className="text-gray-800">{message.message}</span>
                  </div>
                  <div className="mt-1 text-gray-500 text-xs">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Message input form */}
        <form onSubmit={handleSendMessage} className="mt-6">
          <label htmlFor="message" className="sr-only">
            Type your message
          </label>
          <textarea
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here"
            rows="3"
            className="border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition ${loading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Navigate to Zoom button */}
        {messageSent && (
          <div className="mt-4 text-center">
            <button
              onClick={handleNavigateToZoom}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition"
            >
              Go to Zoom Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]); // Store chat messages
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state for the send button
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract sender and receiver from query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const sender = searchParams.get('sender') || 'Guest1'; // Default to 'Guest1' if not provided
//   const receiver = searchParams.get('receiver') || 'Guest2'; // Default to 'Guest2' if not provided

//   // Fetch API URL from environment variable using Vite's import.meta.env
//   const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat`;


//   // Debugging: Log the API URL to verify
//   console.log("API URL:", API_URL);

//   // Fetch chat messages when the component mounts
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(API_URL); // Fetch messages from backend
//         if (response.data.success && Array.isArray(response.data.data)) {
//           setMessages(response.data.data);
//         } else {
//           throw new Error('Invalid response from server.');
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setErrorMessage('Failed to load messages. Please try again later.');
//       }
//     };

//     fetchMessages();
//   }, [API_URL]);

//   // Handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return; // Prevent empty messages

//     setLoading(true);
//     try {
//       const response = await axios.post(API_URL, {
//         message: newMessage,
//         sender,
//         receiver,
//       });

//       if (response.data.success) {
//         setMessages((prevMessages) => [...prevMessages, response.data.data]);
//         setNewMessage('');
//         setErrorMessage('');
        
//         // After the message is sent, navigate to the Zoom meeting page
//         setTimeout(() => {
//           navigate('/zoom-meeting'); // Replace '/zoom-meeting' with your actual Zoom meeting page route
//         }, 1500); // Wait for 1.5 seconds before navigating
//       } else {
//         throw new Error(response.data.message || 'Message send failed.');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setErrorMessage('Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-50 p-6 min-h-screen">
//       <div className="border-gray-200 bg-white shadow-lg p-6 border rounded-lg w-full max-w-2xl">
//         <h1 className="mb-4 font-bold text-3xl text-center text-gray-900">Chat Room</h1>

//         {/* Navigation */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate('/')}
//             className="text-blue-600 text-sm hover:text-blue-800 transition"
//           >
//             ⬅ Back to Home
//           </button>
//           <p className="text-gray-600 text-sm">
//             Chatting with <strong className="text-gray-900">{receiver}</strong> as{' '}
//             <strong className="text-gray-900">{sender}</strong>
//           </p>
//         </div>

//         {/* Error message */}
//         {errorMessage && (
//           <p className="mb-4 text-center text-red-600" role="alert">
//             {errorMessage}
//           </p>
//         )}

//         {/* Chat messages */}
//         <div
//           className="border-gray-300 bg-gray-50 p-4 border rounded-lg h-80 overflow-y-scroll"
//           aria-live="polite"
//         >
//           {messages.length === 0 ? (
//             <p className="text-center text-gray-600">No messages yet. Start the conversation!</p>
//           ) : (
//             <ul className="space-y-2">
//               {messages.map((message, index) => (
//                 <li
//                   key={index}
//                   className={`p-3 rounded ${message.sender === sender ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
//                 >
//                   <div>
//                     <strong className="text-gray-900">{message.sender}:</strong>{' '}
//                     <span className="text-gray-800">{message.message}</span>
//                   </div>
//                   <div className="mt-1 text-gray-500 text-xs">
//                     {new Date(message.timestamp).toLocaleString()}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Message input form */}
//         <form onSubmit={handleSendMessage} className="mt-6">
//           <label htmlFor="message" className="sr-only">
//             Type your message
//           </label>
//           <textarea
//             id="message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message here"
//             rows="3"
//             className="border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition ${loading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//           >
//             {loading ? 'Sending...' : 'Send Message'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]); // Store chat messages
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state for the send button
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract sender and receiver from query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const sender = searchParams.get('sender') || 'Guest1'; // Default to 'Guest1' if not provided
//   const receiver = searchParams.get('receiver') || 'Guest2'; // Default to 'Guest2' if not provided

//   // Fetch API URL from environment variable using Vite's import.meta.env
//   const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat`;


//   // Debugging: Log the API URL to verify
//   console.log("API URL:", API_URL);

//   // Fetch chat messages when the component mounts
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(API_URL); // Fetch messages from backend
//         if (response.data.success && Array.isArray(response.data.data)) {
//           setMessages(response.data.data);
//         } else {
//           throw new Error('Invalid response from server.');
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setErrorMessage('Failed to load messages. Please try again later.');
//       }
//     };

//     fetchMessages();
//   }, [API_URL]);

//   // Handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return; // Prevent empty messages

//     setLoading(true);
//     try {
//       const response = await axios.post(API_URL, {
//         message: newMessage,
//         sender,
//         receiver,
//       });

//       if (response.data.success) {
//         setMessages((prevMessages) => [...prevMessages, response.data.data]);
//         setNewMessage('');
//         setErrorMessage('');
//       } else {
//         throw new Error(response.data.message || 'Message send failed.');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setErrorMessage('Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-50 p-6 min-h-screen">
//       <div className="border-gray-200 bg-white shadow-lg p-6 border rounded-lg w-full max-w-2xl">
//         <h1 className="mb-4 font-bold text-3xl text-center text-gray-900">Chat Room</h1>

//         {/* Navigation */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate('/')}
//             className="text-blue-600 text-sm hover:text-blue-800 transition"
//           >
//             ⬅ Back to Home
//           </button>
//           <p className="text-gray-600 text-sm">
//             Chatting with <strong className="text-gray-900">{receiver}</strong> as{' '}
//             <strong className="text-gray-900">{sender}</strong>
//           </p>
//         </div>

//         {/* Error message */}
//         {errorMessage && (
//           <p className="mb-4 text-center text-red-600" role="alert">
//             {errorMessage}
//           </p>
//         )}

//         {/* Chat messages */}
//         <div
//           className="border-gray-300 bg-gray-50 p-4 border rounded-lg h-80 overflow-y-scroll"
//           aria-live="polite"
//         >
//           {messages.length === 0 ? (
//             <p className="text-center text-gray-600">No messages yet. Start the conversation!</p>
//           ) : (
//             <ul className="space-y-2">
//               {messages.map((message, index) => (
//                 <li
//                   key={index}
//                   className={`p-3 rounded ${message.sender === sender ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
//                 >
//                   <div>
//                     <strong className="text-gray-900">{message.sender}:</strong>{' '}
//                     <span className="text-gray-800">{message.message}</span>
//                   </div>
//                   <div className="mt-1 text-gray-500 text-xs">
//                     {new Date(message.timestamp).toLocaleString()}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Message input form */}
//         <form onSubmit={handleSendMessage} className="mt-6">
//           <label htmlFor="message" className="sr-only">
//             Type your message
//           </label>
//           <textarea
//             id="message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message here"
//             rows="3"
//             className="border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition ${loading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//           >
//             {loading ? 'Sending...' : 'Send Message'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
