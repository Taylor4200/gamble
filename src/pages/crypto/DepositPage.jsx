import React, { useState } from 'react';

const DepositPage = () => {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [showQR, setShowQR] = useState(false);

    const cryptoOptions = [
        { symbol: 'BTC', name: 'Bitcoin', minDeposit: '0.001' },
        { symbol: 'ETH', name: 'Ethereum', minDeposit: '0.01' },
        { symbol: 'USDT', name: 'Tether', minDeposit: '20' },
        { symbol: 'DOGE', name: 'Dogecoin', minDeposit: '100' },
        { symbol: 'XRP', name: 'Ripple', minDeposit: '10' },
        { symbol: 'LTC', name: 'Litecoin', minDeposit: '0.1' },
        { symbol: 'TRX', name: 'Tron', minDeposit: '100' },
        { symbol: 'USDC', name: 'USD Coin', minDeposit: '20' }
    ];

    const handleCryptoSelect = (symbol) => {
        setSelectedCrypto(symbol);
        setShowQR(true);
    };

    const selectedCryptoDetails = cryptoOptions.find(crypto => crypto.symbol === selectedCrypto);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Deposit Crypto</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Select Cryptocurrency</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {cryptoOptions.map(crypto => (
                            <button
                                key={crypto.symbol}
                                onClick={() => handleCryptoSelect(crypto.symbol)}
                                className={`flex flex-col items-center justify-center p-4 rounded-lg transition transform hover:scale-105 ${
                                    selectedCrypto === crypto.symbol
                                        ? 'bg-blue-600'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                            >
                                <span className="font-bold text-white uppercase">{crypto.symbol}</span>
                                <span className="text-xs text-gray-400">{crypto.name}</span>
                            </button>
                        ))}
                    </div>

                    {selectedCrypto && (
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    Minimum Deposit
                                </label>
                                <div className="text-white font-semibold">
                                    {selectedCryptoDetails.minDeposit} {selectedCrypto}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    Expected Amount
                                </label>
                                <input
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    placeholder={`Min ${selectedCryptoDetails.minDeposit} ${selectedCrypto}`}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="text-sm text-gray-400">
                                <p>• Deposits will be credited after 2 network confirmations</p>
                                <p>• Send only {selectedCrypto} to this address</p>
                                <p>• Minimum deposit: {selectedCryptoDetails.minDeposit} {selectedCrypto}</p>
                            </div>
                        </div>
                    )}
                </div>

                {showQR && selectedCrypto && (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Deposit Address</h3>
                        
                        <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                            {/* Placeholder for QR Code */}
                            <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                QR Code
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2">
                                {selectedCrypto} Address
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                    readOnly
                                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <button className="text-blue-400 hover:text-blue-300">
                                View on Explorer
                            </button>
                            <button className="text-blue-400 hover:text-blue-300">
                                Share Address
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepositPage; 