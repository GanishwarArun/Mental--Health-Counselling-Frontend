import React from 'react';

const Chat = () => {
  return (
    <div className="chat-box bg-gray-100 p-4 rounded-md shadow-md">
      <div className="messages mb-4">
        {/* Messages will be displayed here */}
      </div>
      <input
        type="text"
        className="border p-2 w-full rounded-md"
        placeholder="Type your message..."
      />
    </div>
  );
};

export default Chat;
