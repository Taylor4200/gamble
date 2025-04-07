// src/pages/CasinoPage.jsx
import React from 'react';

const CasinoPage = () => {
    const casinoGames = [
        {
            id: '1',
            title: 'Live Blackjack',
            imageUrl: 'https://placehold.co/300x200',
            provider: 'Evolution',
            isLive: true
        },
        {
            id: '2',
            title: 'European Roulette',
            imageUrl: 'https://placehold.co/300x200',
            provider: 'Evolution',
            isLive: true
        },
        {
            id: '3',
            title: 'Baccarat',
            imageUrl: 'https://placehold.co/300x200',
            provider: 'Pragmatic Play',
            isLive: true
        }
    ];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Casino Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {casinoGames.map(game => (
                    <div key={game.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform">
                        <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded" />
                        <h3 className="text-white mt-2">{game.title}</h3>
                        <p className="text-gray-400">{game.provider}</p>
                        {game.isLive && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">LIVE</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CasinoPage;