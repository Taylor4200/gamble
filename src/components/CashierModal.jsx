import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';

const CashierModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('deposit');
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');

    const cryptoOptions = [
        { id: 'btc', name: 'BTC', fullName: 'Bitcoin', icon: '₿', color: 'text-orange-500', minDeposit: '0.001', fee: '0.0001' },
        { id: 'eth', name: 'ETH', fullName: 'Ethereum', icon: 'Ξ', color: 'text-purple-500', minDeposit: '0.01', fee: '0.003' },
        { id: 'usdt', name: 'USDT', fullName: 'Tether', icon: '₮', color: 'text-green-500', minDeposit: '20', fee: '1' }
    ];

    if (!isOpen) return null;

    const mockAddresses = {
        btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        eth: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        usdt: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    };

    const selectedCryptoDetails = cryptoOptions.find(crypto => crypto.id === selectedCrypto);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Cashier</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-800">
                    {['deposit', 'buy', 'withdraw', 'tip'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-center font-medium transition ${
                                activeTab === tab
                                    ? 'text-white border-b-2 border-blue-500'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'deposit' && (
                        <div className="space-y-6">
                            {/* Crypto Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {cryptoOptions.map(crypto => (
                                    <button
                                        key={crypto.id}
                                        onClick={() => setSelectedCrypto(crypto.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${
                                            selectedCrypto === crypto.id
                                                ? 'bg-blue-600'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                                        <span className="font-medium mt-2">{crypto.name}</span>
                                        <span className="text-xs text-gray-400">{crypto.fullName}</span>
                                        <span className="text-xs text-gray-400 mt-1">Balance: {user.balance[crypto.id]}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Deposit Info */}
                            {selectedCrypto && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex justify-center mb-4">
                                        <QRCodeSVG
                                            value={mockAddresses[selectedCrypto]}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                            className="bg-white p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-700 p-2 rounded">
                                        <input
                                            type="text"
                                            value={mockAddresses[selectedCrypto]}
                                            readOnly
                                            className="flex-1 bg-transparent text-white text-sm"
                                        />
                                        <button
                                            onClick={() => navigator.clipboard.writeText(mockAddresses[selectedCrypto])}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <div className="mt-4 text-sm text-gray-400">
                                        <p>• Minimum deposit: {selectedCryptoDetails.minDeposit} {selectedCryptoDetails.name}</p>
                                        <p>• Network fee: {selectedCryptoDetails.fee} {selectedCryptoDetails.name}</p>
                                        <p>• Deposits will be credited after 2 network confirmations</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'withdraw' && (
                        <div className="space-y-6">
                            {/* Crypto Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {cryptoOptions.map(crypto => (
                                    <button
                                        key={crypto.id}
                                        onClick={() => setSelectedCrypto(crypto.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${
                                            selectedCrypto === crypto.id
                                                ? 'bg-blue-600'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                                        <span className="font-medium mt-2">{crypto.name}</span>
                                        <span className="text-xs text-gray-400">{crypto.fullName}</span>
                                        <span className="text-xs text-gray-400 mt-1">Balance: {user.balance[crypto.id]}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Withdrawal Form */}
                            {selectedCrypto && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={withdrawAmount}
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    placeholder={`Min ${selectedCryptoDetails.minDeposit}`}
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <button
                                                    onClick={() => setWithdrawAmount(user.balance[selectedCrypto])}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm hover:text-blue-300"
                                                >
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Withdrawal Address</label>
                                            <input
                                                type="text"
                                                value={withdrawAddress}
                                                onChange={(e) => setWithdrawAddress(e.target.value)}
                                                placeholder={`Enter ${selectedCryptoDetails.name} address`}
                                                className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-400">
                                            <div className="flex justify-between">
                                                <span>Available Balance:</span>
                                                <span>{user.balance[selectedCrypto]} {selectedCryptoDetails.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Network Fee:</span>
                                                <span>{selectedCryptoDetails.fee} {selectedCryptoDetails.name}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold text-white">
                                                <span>You Will Receive:</span>
                                                <span>
                                                    {withdrawAmount && Number(withdrawAmount) > 0
                                                        ? (Number(withdrawAmount) - Number(selectedCryptoDetails.fee)).toFixed(8)
                                                        : '0'
                                                    } {selectedCryptoDetails.name}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log('Withdraw:', {
                                                    crypto: selectedCrypto,
                                                    amount: withdrawAmount,
                                                    address: withdrawAddress
                                                });
                                            }}
                                            className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Withdraw {selectedCryptoDetails.name}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'buy' && (
                        <div className="text-center text-gray-400">
                            <p>Buy crypto with card or bank transfer</p>
                            <p className="text-sm mt-2">Coming soon</p>
                        </div>
                    )}

                    {activeTab === 'tip' && (
                        <div className="space-y-6">
                            {/* Crypto Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {cryptoOptions.map(crypto => (
                                    <button
                                        key={crypto.id}
                                        onClick={() => setSelectedCrypto(crypto.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${
                                            selectedCrypto === crypto.id
                                                ? 'bg-blue-600'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                                        <span className="font-medium mt-2">{crypto.name}</span>
                                        <span className="text-xs text-gray-400">{crypto.fullName}</span>
                                        <span className="text-xs text-gray-400 mt-1">Balance: {user.balance[crypto.id]}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Tip Form */}
                            {selectedCrypto && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Tip Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={withdrawAmount}
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    placeholder={`Min ${selectedCryptoDetails.minDeposit}`}
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {[0.001, 0.005, 0.01, 0.05].map(amount => (
                                                <button
                                                    key={amount}
                                                    onClick={() => setWithdrawAmount(amount.toString())}
                                                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                                                >
                                                    {amount} {selectedCryptoDetails.name}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log('Tip:', {
                                                    crypto: selectedCrypto,
                                                    amount: withdrawAmount
                                                });
                                            }}
                                            className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Send Tip
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CashierModal; 