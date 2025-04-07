import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const BalanceWidget = ({ onOpenCashier }) => {
    const { user } = useAuth();
    const [selectedCurrency, setSelectedCurrency] = useState('btc');
    const [showCurrencySelect, setShowCurrencySelect] = useState(false);

    const balanceSymbols = {
        btc: '₿',
        eth: 'Ξ',
        usdt: '₮'
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setShowCurrencySelect(false);
    };

    return (
        <div className="relative flex items-center gap-2">
            <div 
                className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => setShowCurrencySelect(!showCurrencySelect)}
            >
                <span className="text-gray-400">{balanceSymbols[selectedCurrency]}</span>
                <span className="text-white">{user.balance[selectedCurrency]}</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>

            <button
                onClick={onOpenCashier}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Deposit
            </button>

            {/* Currency Select Dropdown */}
            {showCurrencySelect && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                    {Object.entries(user.balance).map(([currency, balance]) => (
                        <div
                            key={currency}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleCurrencySelect(currency)}
                        >
                            <span className="text-gray-400">{balanceSymbols[currency]}</span>
                            <span className="text-white">{currency.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BalanceWidget; 