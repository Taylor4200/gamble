import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: 'CryptoKing',
    email: 'crypto@example.com',
    joinDate: '2024-01-15',
    rank: {
      current: 'Gold',
      next: 'Platinum',
      progress: 75,
      requirements: {
        wagered: 150000,
        nextWagered: 200000
      }
    },
    stats: {
      totalWagered: 150000,
      totalWon: 165000,
      totalLost: 135000,
      profitLoss: 30000,
      gamesPlayed: 1250,
      favoriteGame: 'Slots',
      winRate: 52.4
    },
    achievements: [
      {
        name: 'High Roller',
        description: 'Wager over $100,000',
        completed: true,
        progress: 100
      },
      {
        name: 'Lucky Streak',
        description: 'Win 10 games in a row',
        completed: false,
        progress: 70
      },
      {
        name: 'Crypto Whale',
        description: 'Deposit over $50,000',
        completed: true,
        progress: 100
      }
    ],
    rankLevels: [
      { name: 'Bronze', requirement: 0, benefits: ['Basic Support', '1% Rakeback'] },
      { name: 'Silver', requirement: 50000, benefits: ['Priority Support', '2% Rakeback'] },
      { name: 'Gold', requirement: 100000, benefits: ['VIP Support', '3% Rakeback', 'Weekly Bonus'] },
      { name: 'Platinum', requirement: 200000, benefits: ['24/7 VIP Support', '5% Rakeback', 'Daily Bonus', 'Monthly Rewards'] },
      { name: 'Diamond', requirement: 500000, benefits: ['Personal Manager', '7% Rakeback', 'Premium Rewards', 'Exclusive Events'] }
    ]
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold">
            {userData.username.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData.username}</h1>
            <p className="text-gray-400">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
            <div className="mt-2">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {userData.rank.current} Rank
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Progress */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Rank Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>{userData.rank.current}</span>
            <span>{userData.rank.next}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${userData.rank.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            ${userData.rank.requirements.wagered.toLocaleString()} / ${userData.rank.requirements.nextWagered.toLocaleString()} wagered
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Wagered</span>
              <span className="font-semibold">${userData.stats.totalWagered.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Won</span>
              <span className="text-green-400 font-semibold">${userData.stats.totalWon.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Lost</span>
              <span className="text-red-400 font-semibold">${userData.stats.totalLost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Profit/Loss</span>
              <span className={`font-semibold ${userData.stats.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${userData.stats.profitLoss.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Games Played</span>
              <span className="font-semibold">{userData.stats.gamesPlayed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Win Rate</span>
              <span className="font-semibold">{userData.stats.winRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Favorite Game</span>
              <span className="font-semibold">{userData.stats.favoriteGame}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <div className="space-y-4">
            {userData.achievements.map((achievement, index) => (
              <div key={index} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Completed</span>
                  )}
                </div>
                {!achievement.completed && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rank Benefits */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Rank Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {userData.rankLevels.map((rank, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                rank.name === userData.rank.current 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-700'
              }`}
            >
              <h3 className="font-bold mb-2">{rank.name}</h3>
              <p className="text-sm mb-2">Requires: ${rank.requirement.toLocaleString()}</p>
              <ul className="text-sm space-y-1">
                {rank.benefits.map((benefit, i) => (
                  <li key={i}>• {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 