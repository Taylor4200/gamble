import React, { useState } from 'react';

const RewardsPage = () => {
  const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'weekly', 'monthly', 'vip'

  const dailyRewards = [
    { day: 1, reward: '100 Coins', icon: '🪙', claimed: true },
    { day: 2, reward: '200 Coins', icon: '🪙', claimed: true },
    { day: 3, reward: '300 Coins', icon: '🪙', claimed: true },
    { day: 4, reward: '400 Coins', icon: '🪙', claimed: false },
    { day: 5, reward: '500 Coins', icon: '🪙', claimed: false },
    { day: 6, reward: '600 Coins', icon: '🪙', claimed: false },
    { day: 7, reward: '1000 Coins + Mystery Pack', icon: '🎁', claimed: false }
  ];

  const weeklyBonuses = [
    {
      name: 'Weekly Challenge',
      description: 'Complete 50 battles this week',
      reward: '2000 Coins',
      progress: 35,
      target: 50,
      icon: '⚔️'
    },
    {
      name: 'Wagering Bonus',
      description: 'Wager $1000 this week',
      reward: '5% Cashback',
      progress: 750,
      target: 1000,
      icon: '💰'
    },
    {
      name: 'Win Streak',
      description: 'Win 10 battles in a row',
      reward: '3000 Coins',
      progress: 4,
      target: 10,
      icon: '🔥'
    }
  ];

  const monthlyRewards = [
    {
      tier: 'Bronze',
      requirement: 'Wager $5000',
      rewards: ['5000 Coins', '1 Premium Pack'],
      icon: '🥉',
      progress: 3500,
      target: 5000
    },
    {
      tier: 'Silver',
      requirement: 'Wager $10000',
      rewards: ['10000 Coins', '2 Premium Packs', '5% Rakeback'],
      icon: '🥈',
      progress: 7500,
      target: 10000
    },
    {
      tier: 'Gold',
      requirement: 'Wager $25000',
      rewards: ['25000 Coins', '5 Premium Packs', '10% Rakeback', 'VIP Status'],
      icon: '🏆',
      progress: 12000,
      target: 25000
    }
  ];

  const vipBenefits = [
    {
      level: 'Bronze',
      icon: '🥉',
      requirements: 'Wager $5000',
      benefits: [
        'Basic Support',
        '1% Rakeback',
        'Daily Bonus'
      ]
    },
    {
      level: 'Silver',
      icon: '🥈',
      requirements: 'Wager $10000',
      benefits: [
        'Priority Support',
        '2% Rakeback',
        'Weekly Bonus',
        'Exclusive Events'
      ]
    },
    {
      level: 'Gold',
      icon: '🏆',
      requirements: 'Wager $25000',
      benefits: [
        'VIP Support',
        '3% Rakeback',
        'Daily & Weekly Bonuses',
        'Priority Withdrawals',
        'Exclusive Tournaments'
      ]
    },
    {
      level: 'Platinum',
      icon: '💎',
      requirements: 'Wager $50000',
      benefits: [
        '24/7 VIP Support',
        '5% Rakeback',
        'Custom Bonuses',
        'Personal Manager',
        'Exclusive VIP Events'
      ]
    },
    {
      level: 'Diamond',
      icon: '👑',
      requirements: 'Wager $100000',
      benefits: [
        'Personal VIP Manager',
        '7% Rakeback',
        'Custom Rewards',
        'Exclusive VIP Tournaments',
        'Premium Support'
      ]
    }
  ];

  const handleClaimReward = (type, id) => {
    console.log(`Claiming ${type} reward ${id}`);
    // Implement reward claiming logic
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Rewards & Benefits</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {['daily', 'weekly', 'monthly', 'vip'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Daily Rewards */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Daily Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {dailyRewards.map((reward) => (
              <div
                key={reward.day}
                className={`bg-gray-800 rounded-lg p-4 text-center ${
                  reward.claimed ? 'opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2">{reward.icon}</div>
                <p className="text-sm text-gray-400">Day {reward.day}</p>
                <p className="font-semibold mb-2">{reward.reward}</p>
                <button
                  onClick={() => handleClaimReward('daily', reward.day)}
                  disabled={reward.claimed}
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    reward.claimed
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {reward.claimed ? 'Claimed' : 'Claim'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Bonuses */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Weekly Bonuses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weeklyBonuses.map((bonus, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{bonus.icon}</span>
                  <div>
                    <h3 className="font-bold">{bonus.name}</h3>
                    <p className="text-sm text-gray-400">{bonus.description}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{bonus.progress}/{bonus.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(bonus.progress / bonus.target) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-400">{bonus.reward}</span>
                  <button
                    onClick={() => handleClaimReward('weekly', index)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                  >
                    Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Rewards */}
      {activeTab === 'monthly' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Monthly Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyRewards.map((reward, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{reward.icon}</span>
                  <div>
                    <h3 className="font-bold">{reward.tier}</h3>
                    <p className="text-sm text-gray-400">{reward.requirement}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>${reward.progress.toLocaleString()}/${reward.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(reward.progress / reward.target) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {reward.rewards.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIP Benefits */}
      {activeTab === 'vip' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">VIP Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipBenefits.map((level, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{level.icon}</span>
                  <div>
                    <h3 className="font-bold">{level.level}</h3>
                    <p className="text-sm text-gray-400">{level.requirements}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {level.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-blue-400">✓</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage; 