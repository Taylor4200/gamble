import React, { useState } from 'react';

const BattleHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'won', 'lost'
  const [battles] = useState([
    {
      id: 1,
      game: { name: 'CS:GO', icon: '🎯' },
      date: '2024-03-15T14:30:00',
      betAmount: 50.00,
      result: 'won',
      profit: 47.50,
      players: [
        { name: 'Player1', score: 16, result: 'won' },
        { name: 'Player2', score: 14, result: 'lost' }
      ]
    },
    {
      id: 2,
      game: { name: 'Dota 2', icon: '⚔️' },
      date: '2024-03-14T18:45:00',
      betAmount: 100.00,
      result: 'lost',
      profit: -100.00,
      players: [
        { name: 'Player1', score: 0, result: 'lost' },
        { name: 'Player2', score: 1, result: 'won' }
      ]
    },
    {
      id: 3,
      game: { name: 'Valorant', icon: '🎮' },
      date: '2024-03-13T10:15:00',
      betAmount: 75.00,
      result: 'won',
      profit: 71.25,
      players: [
        { name: 'Player1', score: 13, result: 'won' },
        { name: 'Player2', score: 11, result: 'lost' }
      ]
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredBattles = battles.filter(battle => {
    if (activeTab === 'all') return true;
    return battle.result === activeTab;
  });

  const stats = {
    totalBattles: battles.length,
    wonBattles: battles.filter(b => b.result === 'won').length,
    totalProfit: battles.reduce((acc, battle) => acc + battle.profit, 0)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Battle History</h1>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-400">Total Battles</p>
            <p className="text-xl font-bold">{stats.totalBattles}</p>
          </div>
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-400">Win Rate</p>
            <p className="text-xl font-bold">
              {((stats.wonBattles / stats.totalBattles) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-400">Total Profit</p>
            <p className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stats.totalProfit.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['all', 'won', 'lost'].map((tab) => (
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

      {/* Battle List */}
      <div className="space-y-4">
        {filteredBattles.map((battle) => (
          <div key={battle.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{battle.game.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{battle.game.name}</h3>
                  <p className="text-sm text-gray-400">{formatDate(battle.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Bet Amount</p>
                  <p className="font-bold">${battle.betAmount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Profit</p>
                  <p className={`font-bold ${battle.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {battle.profit >= 0 ? '+' : ''}{battle.profit.toFixed(2)}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium
                  ${battle.result === 'won' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'}`}
                >
                  {battle.result.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {battle.players.map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg
                    ${player.result === 'won' ? 'bg-green-500 bg-opacity-10' : 'bg-red-500 bg-opacity-10'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">Score: {player.score}</span>
                    <span className={`text-sm font-medium
                      ${player.result === 'won' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {player.result.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleHistoryPage; 