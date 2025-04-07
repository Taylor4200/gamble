import React, { useState } from 'react';
import CryptoModal from './CryptoModal';

const ChatMessage = ({ message, currentUserId }) => {
    const [showTipModal, setShowTipModal] = useState(false);

    const handleUserClick = () => {
        if (currentUserId && currentUserId !== message.userId) {
            setShowTipModal(true);
        }
    };

    return (
        <>
            <div className="group flex items-start space-x-3 p-2 hover:bg-gray-800/50 rounded-lg transition">
                <img
                    src={message.userAvatar || '/default-avatar.png'}
                    alt={message.username}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleUserClick}
                            className="font-medium text-blue-400 hover:text-blue-300 transition"
                        >
                            {message.username}
                        </button>
                        {message.role && (
                            <span className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300">
                                {message.role}
                            </span>
                        )}
                        <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                    <p className="text-gray-300 break-words">{message.content}</p>
                </div>
            </div>

            {showTipModal && (
                <CryptoModal
                    isOpen={showTipModal}
                    onClose={() => setShowTipModal(false)}
                    userId={currentUserId}
                    recipientId={message.userId}
                />
            )}
        </>
    );
};

export default ChatMessage; 