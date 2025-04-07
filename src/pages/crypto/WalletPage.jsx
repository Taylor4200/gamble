import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const WalletPage = () => {
    const [activeTab, setActiveTab] = useState('balance'); // 'balance', 'history', 'addresses'
    const { user } = useAuth();

    const transactions = [
        {
            id: '1',
            type: 'deposit',
            coin: 'BTC',
            amount: '0.02345',
            status: 'completed',
            date: '2024-04-10 15:30'
        },
        {
            id: '2',
            type: 'withdraw',
            coin: 'ETH',
            amount: '0.5000',
            status: 'pending',
            date: '2024-04-10 14:15'
        }
    ];

    const addresses = [
        {
            coin: 'BTC',
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            network: 'Bitcoin'
        },
        {
            coin: 'ETH',
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            network: 'Ethereum'
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Crypto Wallet</h2>

            <div className="flex gap-4 mb-6">
                {['balance', 'history', 'addresses'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded ${
                            activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'balance' && (
                <div className="space-y-6">
                    {/* Total Balance Card */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <h3 className="text-gray-400 text-sm">Total Balance</h3>
                                <p className="text-2xl font-bold text-green-400">
                                    ${Object.values(user.balance).reduce((acc, curr) => acc + parseFloat(curr), 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-400 text-sm">Rank</h3>
                                <p className="text-2xl font-bold text-yellow-400">{user.role}</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-400 text-sm">Total Wagered</h3>
                                <p className="text-2xl font-bold text-blue-400">$0.00</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-400 text-sm">Next Rank Progress</h3>
                                <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                                    <div 
                                        className="bg-blue-600 h-4 rounded-full" 
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Crypto Balances */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(user.balance).map(([symbol, balance]) => (
                            <div key={symbol} className="bg-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-2">
                                            {symbol === 'btc' ? '₿' : symbol === 'eth' ? 'Ξ' : '₮'}
                                        </span>
                                        <span className="text-lg font-medium">{symbol.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold mb-2">{balance}</div>
                                <div className="text-gray-400 text-sm">
                                    ≈ ${(parseFloat(balance)).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Coin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {transactions.map(tx => (
                                <tr key={tx.id} className="hover:bg-gray-750">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            tx.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white">{tx.coin}</td>
                                    <td className="px-6 py-4 text-white">{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{tx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'addresses' && (
                <div className="space-y-4">
                    {addresses.map(addr => (
                        <div key={addr.coin} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-2">
                                        {addr.coin === 'BTC' ? '₿' : addr.coin === 'ETH' ? 'Ξ' : '₮'}
                                    </span>
                                    <span className="text-lg font-medium">{addr.coin}</span>
                                </div>
                                <span className="text-sm text-gray-400">{addr.network}</span>
                            </div>
                            <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                                <code className="text-sm text-gray-300">{addr.address}</code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(addr.address)}
                                    className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletPage; 