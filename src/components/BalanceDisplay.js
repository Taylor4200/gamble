// components/BalanceDisplay.js
import React from 'react';

const BalanceDisplay = ({ balance, onDeposit }) => {
    return (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="text-white mb-2">
                Balance: ${balance.toFixed(2)}
            </div>
            <button
                onClick={onDeposit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
                Deposit
            </button>
        </div>
    );
};

export default BalanceDisplay;