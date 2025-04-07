import React, { useState } from 'react';

const PromotionsPage = () => {
    const [activeTab, setActiveTab] = useState('daily'); // 'daily' or 'weekly'

    const dailyRewards = [
        {
            id: '1',
            day: 1,
            reward: '10 Free Spins',
            claimed: true
        },
        {
            id: '2',
            day: 2,
            reward: '$5 Bonus',
            claimed: true
        },
        {
            id: '3',
            day: 3,
            reward: '15 Free Spins',
            claimed: false
        },
        {
            id: '4',
            day: 4,
            reward: '$10 Bonus',
            claimed: false
        },
        {
            id: '5',
            day: 5,
            reward: '20 Free Spins',
            claimed: false
        }
    ];

    const weeklyBonuses = [
        {
            id: '1',
            name: 'Monday Madness',
            description: '100% Deposit Match up to $100',
            status: 'available'
        },
        {
            id: '2',
            name: 'Wednesday Boost',
            description: '50 Free Spins on Selected Slots',
            status: 'claimed'
        },
        {
            id: '3',
            name: 'Weekend Special',
            description: '200% Deposit Match up to $200',
            status: 'upcoming'
        }
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Promotions</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'daily'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Daily Rewards
                    </button>
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'weekly'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Weekly Bonuses
                    </button>
                </div>
            </div>

            {activeTab === 'daily' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {dailyRewards.map(reward => (
                        <div
                            key={reward.id}
                            className={`bg-gray-800 rounded-lg p-6 text-center ${
                                reward.claimed ? 'opacity-75' : ''
                            }`}
                        >
                            <div className="text-2xl font-bold text-white mb-2">Day {reward.day}</div>
                            <div className="text-gray-300 mb-4">{reward.reward}</div>
                            <button
                                className={`w-full px-4 py-2 rounded ${
                                    reward.claimed
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                                disabled={reward.claimed}
                            >
                                {reward.claimed ? 'Claimed' : 'Claim'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {weeklyBonuses.map(bonus => (
                        <div key={bonus.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{bonus.name}</h3>
                                    <p className="text-gray-400">{bonus.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded text-sm ${
                                    bonus.status === 'available'
                                        ? 'bg-green-600 text-white'
                                        : bonus.status === 'claimed'
                                            ? 'bg-gray-600 text-gray-300'
                                            : 'bg-yellow-600 text-white'
                                }`}>
                                    {bonus.status.charAt(0).toUpperCase() + bonus.status.slice(1)}
                                </span>
                            </div>
                            <button
                                className={`w-full px-4 py-2 rounded ${
                                    bonus.status === 'available'
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : bonus.status === 'claimed'
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : 'bg-yellow-600 text-white cursor-not-allowed'
                                }`}
                                disabled={bonus.status !== 'available'}
                            >
                                {bonus.status === 'available' ? 'Claim Now' : 
                                 bonus.status === 'claimed' ? 'Already Claimed' : 'Coming Soon'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PromotionsPage; 