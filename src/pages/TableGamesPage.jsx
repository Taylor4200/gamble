import React from 'react';

const TableGamesPage = () => {
    const tableGames = [
        {
            id: '1',
            title: 'Classic Blackjack',
            type: 'Blackjack',
            minBet: '1.00',
            maxBet: '1000.00'
        },
        {
            id: '2',
            title: 'European Roulette',
            type: 'Roulette',
            minBet: '0.50',
            maxBet: '500.00'
        },
        {
            id: '3',
            title: 'Speed Baccarat',
            type: 'Baccarat',
            minBet: '5.00',
            maxBet: '2000.00'
        }
    ];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Table Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tableGames.map(game => (
                    <div key={game.id} className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors">
                        <h3 className="text-white font-semibold text-lg mb-2">{game.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{game.type}</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Min Bet:</span>
                                <span className="text-green-400">${game.minBet}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Max Bet:</span>
                                <span className="text-green-400">${game.maxBet}</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                            Play Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableGamesPage; 