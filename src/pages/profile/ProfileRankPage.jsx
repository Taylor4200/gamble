import React from 'react';

const ProfileRankPage = () => {
  const rankData = {
    currentRank: {
      name: 'Gold',
      icon: '🏆',
      wagered: 150000,
      nextRankRequirement: 200000,
      progress: 75,
      benefits: [
        'VIP Support',
        '3% Rakeback',
        'Weekly Bonus',
        'Priority Withdrawals'
      ]
    },
    nextRank: {
      name: 'Platinum',
      icon: '💎',
      benefits: [
        '24/7 VIP Support',
        '5% Rakeback',
        'Daily Bonus',
        'Monthly Rewards',
        'Exclusive Events'
      ]
    },
    allRanks: [
      {
        name: 'Bronze',
        icon: '🥉',
        requirement: 0,
        benefits: ['Basic Support', '1% Rakeback'],
        color: 'from-amber-700 to-amber-900'
      },
      {
        name: 'Silver',
        icon: '🥈',
        requirement: 50000,
        benefits: ['Priority Support', '2% Rakeback', 'Weekly Bonus'],
        color: 'from-gray-300 to-gray-500'
      },
      {
        name: 'Gold',
        icon: '🏆',
        requirement: 100000,
        benefits: ['VIP Support', '3% Rakeback', 'Weekly Bonus', 'Priority Withdrawals'],
        color: 'from-yellow-400 to-yellow-600'
      },
      {
        name: 'Platinum',
        icon: '💎',
        requirement: 200000,
        benefits: ['24/7 VIP Support', '5% Rakeback', 'Daily Bonus', 'Monthly Rewards', 'Exclusive Events'],
        color: 'from-cyan-400 to-cyan-600'
      },
      {
        name: 'Diamond',
        icon: '👑',
        requirement: 500000,
        benefits: ['Personal Manager', '7% Rakeback', 'Premium Rewards', 'Exclusive Events', 'Custom Bonuses'],
        color: 'from-purple-400 to-purple-600'
      }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Rank Progress</h1>

      {/* Current Rank Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{rankData.currentRank.icon}</span>
          <div>
            <h2 className="text-xl font-bold">{rankData.currentRank.name} Rank</h2>
            <p className="text-gray-400">
              ${rankData.currentRank.wagered.toLocaleString()} / ${rankData.currentRank.nextRankRequirement.toLocaleString()} wagered
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{rankData.currentRank.name}</span>
            <span>{rankData.nextRank.name}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${rankData.currentRank.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current vs Next Rank Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{rankData.currentRank.icon}</span>
              <h3 className="font-bold">Current Benefits</h3>
            </div>
            <ul className="space-y-2">
              {rankData.currentRank.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{rankData.nextRank.icon}</span>
              <h3 className="font-bold">Next Rank Benefits</h3>
            </div>
            <ul className="space-y-2">
              {rankData.nextRank.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="text-blue-400 mr-2">+</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* All Ranks Overview */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Rank Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {rankData.allRanks.map((rank, index) => (
            <div 
              key={index}
              className={`rounded-lg p-4 bg-gradient-to-br ${rank.color} ${
                rank.name === rankData.currentRank.name ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{rank.icon}</span>
                <h3 className="font-bold">{rank.name}</h3>
              </div>
              <p className="text-sm mb-4">Required: ${rank.requirement.toLocaleString()}</p>
              <ul className="text-sm space-y-1">
                {rank.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRankPage; 