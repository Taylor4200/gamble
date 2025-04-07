import React, { useState } from 'react';

const WithdrawPage = () => {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [network, setNetwork] = useState('');

    const cryptoOptions = [
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            balance: '0.05432',
            minWithdraw: '0.001',
            fee: '0.0001',
            networks: ['Bitcoin']
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            balance: '1.2345',
            minWithdraw: '0.01',
            fee: '0.003',
            networks: ['Ethereum', 'BSC']
        },
        {
            symbol: 'USDT',
            name: 'Tether',
            balance: '500.00',
            minWithdraw: '20',
            fee: '1',
            networks: ['Ethereum', 'BSC', 'Tron']
        }
    ];

    const handleCryptoSelect = (symbol) => {
        setSelectedCrypto(symbol);
        setNetwork('');
        setWithdrawAmount('');
        setWithdrawAddress('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle withdrawal submission
        console.log({
            crypto: selectedCrypto,
            amount: withdrawAmount,
            address: withdrawAddress,
            network
        });
    };

    const selectedCryptoDetails = cryptoOptions.find(crypto => crypto.symbol === selectedCrypto);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Withdraw Crypto</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Select Cryptocurrency</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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
                                <span className="text-sm text-gray-300 mt-2">
                                    Balance: {crypto.balance}
                                </span>
                            </button>
                        ))}
                    </div>

                    {selectedCrypto && (
                        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    Network
                                </label>
                                <select
                                    value={network}
                                    onChange={(e) => setNetwork(e.target.value)}
                                    required
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Network</option>
                                    {selectedCryptoDetails.networks.map(net => (
                                        <option key={net} value={net}>{net}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    Withdrawal Address
                                </label>
                                <input
                                    type="text"
                                    value={withdrawAddress}
                                    onChange={(e) => setWithdrawAddress(e.target.value)}
                                    placeholder={`Enter ${selectedCrypto} address`}
                                    required
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    Amount
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder={`Min ${selectedCryptoDetails.minWithdraw}`}
                                        required
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setWithdrawAmount(selectedCryptoDetails.balance)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm hover:text-blue-300"
                                    >
                                        MAX
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 text-sm text-gray-400">
                                <div className="flex justify-between">
                                    <span>Available Balance:</span>
                                    <span>{selectedCryptoDetails.balance} {selectedCrypto}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Minimum Withdrawal:</span>
                                    <span>{selectedCryptoDetails.minWithdraw} {selectedCrypto}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Network Fee:</span>
                                    <span>{selectedCryptoDetails.fee} {selectedCrypto}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-white">
                                    <span>You Will Receive:</span>
                                    <span>
                                        {withdrawAmount && Number(withdrawAmount) > 0
                                            ? (Number(withdrawAmount) - Number(selectedCryptoDetails.fee)).toFixed(8)
                                            : '0'
                                        } {selectedCrypto}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Withdraw {selectedCrypto}
                            </button>
                        </form>
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Important Notes</h3>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>• Make sure you have selected the correct network for withdrawal</p>
                        <p>• Double-check the withdrawal address before confirming</p>
                        <p>• Withdrawals may take up to 30 minutes to process</p>
                        <p>• Network fees are subject to change based on network conditions</p>
                        <p>• Minimum withdrawal amounts are set to ensure transaction costs are covered</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-900/50 rounded-lg">
                        <h4 className="text-yellow-500 font-semibold mb-2">Security Notice</h4>
                        <p className="text-sm text-yellow-400">
                            For your security, large withdrawals may require additional verification and manual approval.
                            This process can take up to 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawPage; 