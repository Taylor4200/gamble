import React, { useState } from 'react';

const WalletPanel: React.FC = () => {
    const [balance, setBalance] = useState('0.00');
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');

    const cryptoOptions = [
        { symbol: 'BTC', name: 'Bitcoin' },
        { symbol: 'ETH', name: 'Ethereum' },
        { symbol: 'USDT', name: 'Tether' },
    ];

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Wallet</h2>

            <div className="mb-6">
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">${balance}</p>
            </div>

            <div className="space-y-4">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Deposit
                </button>

                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Withdraw
                </button>

                <div className="mt-4">
                    <label className="text-gray-400 text-sm">Select Cryptocurrency</label>
                    <select
                        value={selectedCrypto}
                        onChange={(e) => setSelectedCrypto(e.target.value)}
                        className="mt-1 w-full bg-gray-700 text-white rounded-lg p-2"
                    >
                        {cryptoOptions.map(crypto => (
                            <option key={crypto.symbol} value={crypto.symbol}>
                                {crypto.name} ({crypto.symbol})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default WalletPanel;