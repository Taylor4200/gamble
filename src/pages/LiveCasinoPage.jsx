import React from 'react';

const LiveCasinoPage = () => {
    const liveGames = [
        {
            id: '1',
            title: 'Live Blackjack',
            provider: 'Evolution Gaming',
            players: '23/50'
        },
        {
            id: '2',
            title: 'Live Roulette',
            provider: 'Pragmatic Play',
            players: '45/100'
        },
        {
            id: '3',
            title: 'Live Baccarat',
            provider: 'Evolution Gaming',
            players: '12/30'
        }
    ];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Live Casino</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveGames.map(game => (
                    <div key={game.id} className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-white font-semibold text-lg">{game.title}</h3>
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">LIVE</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{game.provider}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-400 text-sm">Players: {game.players}</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Join Table
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveCasinoPage; 