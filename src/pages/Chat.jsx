
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(''); // Store new message input
  const [user, setUser] = useState('User'); // Example of a user name
  const messagesEndRef = useRef(null); // Reference to scroll to the latest message

  // Fetching previous chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat`);
        setMessages(response.data); // Restore messages from backend
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return; // Prevent empty messages

    const messageData = {
      user,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chat`, messageData);
      setMessages((prevMessages) => [...prevMessages, response.data]); // Add the new message to the chat
      setNewMessage(''); // Clear input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-blue-100 to-blue-300 p-8 min-h-screen">
      <h1 className="drop-shadow-lg mb-6 font-extrabold text-4xl text-blue-900 text-center">Live Chat</h1>

      {/* Chat Messages Section */}
      <div className="flex-grow bg-white shadow-xl mb-6 p-6 rounded-xl overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg ${message.user === user ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
            >
              <p className="font-bold text-blue-900">{message.user}</p>
              <p className="text-gray-800">{message.content}</p>
              <p className="mt-1 text-gray-500 text-xs">{new Date(message.timestamp).toLocaleTimeString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        )}
        {/* Scroll to latest message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="flex items-center bg-white shadow-lg p-4 rounded-lg">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border-gray-300 p-4 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-r-lg focus:ring-4 focus:ring-blue-300 font-bold text-white transform transition-transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
