import React, { useState } from 'react';

const WalletPage = () => {
    const [activeTab, setActiveTab] = useState('balance'); // 'balance', 'history', 'addresses'

    const balances = [
        { coin: 'BTC', amount: '0.05432', value: '2,345.67' },
        { coin: 'ETH', amount: '1.2345', value: '3,456.78' },
        { coin: 'USDT', amount: '500.00', value: '500.00' },
        { coin: 'DOGE', amount: '1000.00', value: '89.45' }
    ];

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
        <div className="p-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {balances.map(balance => (
                        <div key={balance.coin} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-white">{balance.coin}</span>
                                <span className="text-sm text-gray-400">Available</span>
                            </div>
                            <div className="space-y-2">
                                <div className="text-2xl font-bold text-white">{balance.amount}</div>
                                <div className="text-gray-400">${balance.value} USD</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Deposit
                                </button>
                                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    ))}
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
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{addr.coin}</h3>
                                    <p className="text-sm text-gray-400">{addr.network} Network</p>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300">
                                    Copy
                                </button>
                            </div>
                            <div className="bg-gray-700 p-3 rounded break-all text-sm text-gray-300">
                                {addr.address}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="text-sm text-gray-400 hover:text-gray-300">
                                    View on Explorer →
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