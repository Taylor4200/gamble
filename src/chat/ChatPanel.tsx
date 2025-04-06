import React, { useState } from 'react';

interface ChatMessage {
    id: string;
    user: string;
    message: string;
    timestamp: Date;
}

const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: ChatMessage = {
            id: Date.now().toString(),
            user: 'User123', // Replace with actual user
            message: newMessage,
            timestamp: new Date(),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="w-80 bg-gray-800 flex flex-col h-screen">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Live Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-green-400 font-bold">{msg.user}</span>
                            <span className="text-gray-400 text-xs">
                {msg.timestamp.toLocaleTimeString()}
              </span>
                        </div>
                        <p className="text-white">{msg.message}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 rounded-lg hover:bg-green-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPanel;