import React, { useState } from 'react';

const BattlesPage = () => {
    const [activeTab, setActiveTab] = useState('battles'); // 'battles' or 'packs'

    const battles = [
        {
            id: '1',
            players: ['Player1', 'Player2'],
            pot: '100.00',
            status: 'in_progress',
            timeLeft: '1:30'
        },
        {
            id: '2',
            players: ['Player3'],
            pot: '50.00',
            status: 'waiting',
            maxPlayers: 2
        },
        {
            id: '3',
            players: ['Player4', 'Player5', 'Player6'],
            pot: '150.00',
            status: 'in_progress',
            timeLeft: '0:45'
        }
    ];

    const packs = [
        {
            id: '1',
            name: 'Bronze Pack',
            price: '10.00',
            items: '3',
            rarity: 'Common'
        },
        {
            id: '2',
            name: 'Silver Pack',
            price: '25.00',
            items: '5',
            rarity: 'Rare'
        },
        {
            id: '3',
            name: 'Gold Pack',
            price: '50.00',
            items: '7',
            rarity: 'Epic'
        }
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Battles</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('battles')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'battles'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Battles
                    </button>
                    <button
                        onClick={() => setActiveTab('packs')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'packs'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Packs
                    </button>
                </div>
            </div>

            {activeTab === 'battles' ? (
                <div className="space-y-4">
                    {battles.map(battle => (
                        <div key={battle.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    {battle.players.map((player, index) => (
                                        <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded">
                                            {player}
                                        </span>
                                    ))}
                                    {battle.status === 'waiting' && (
                                        <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded">
                                            Waiting for players... ({battle.players.length}/{battle.maxPlayers})
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-green-400">${battle.pot}</span>
                                    {battle.timeLeft && (
                                        <span className="text-yellow-400">{battle.timeLeft}</span>
                                    )}
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                {battle.status === 'waiting' ? 'Join Battle' : 'Watch Battle'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packs.map(pack => (
                        <div key={pack.id} className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-white font-semibold text-lg mb-2">{pack.name}</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Price:</span>
                                    <span className="text-green-400">${pack.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Items:</span>
                                    <span className="text-white">{pack.items}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Rarity:</span>
                                    <span className={`
                                        ${pack.rarity === 'Common' && 'text-gray-300'}
                                        ${pack.rarity === 'Rare' && 'text-blue-400'}
                                        ${pack.rarity === 'Epic' && 'text-purple-400'}
                                    `}>
                                        {pack.rarity}
                                    </span>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Open Pack
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BattlesPage; 