import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: 'Welcome to the chat!', timestamp: new Date() },
    { id: 2, user: 'John', text: 'Hey everyone!', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState('User' + Math.floor(Math.random() * 1000)); // Simple random username
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      user: username,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-white">Live Chat</h2>
        <p className="text-sm text-gray-400">Chatting as: {username}</p>
      </div>
      
      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(100vh - 240px)' }}
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex flex-col ${
              message.user === username 
                ? 'items-end' 
                : 'items-start'
            }`}
          >
            <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.user === username
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-white'
            }`}>
              <div className="font-bold text-sm">{message.user}</div>
              <div className="mt-1">{message.text}</div>
              <div className="text-xs opacity-70 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Form */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 bg-gray-800 rounded-b-lg"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;