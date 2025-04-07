import React from 'react';

const ProfileStatsPage = () => {
  const stats = {
    overall: {
      totalBets: 3567,
      totalWagered: 250000,
      totalWon: 275000,
      totalLost: 225000,
      profitLoss: 50000,
      winRate: 54.3
    },
    games: {
      slots: {
        name: 'Slots',
        bets: 2000,
        wagered: 150000,
        won: 165000,
        lost: 135000,
        profitLoss: 30000,
        winRate: 52.5
      },
      liveCasino: {
        name: 'Live Casino',
        bets: 800,
        wagered: 50000,
        won: 55000,
        lost: 45000,
        profitLoss: 10000,
        winRate: 56.2
      },
      sports: {
        name: 'Sports',
        bets: 567,
        wagered: 35000,
        won: 40000,
        lost: 30000,
        profitLoss: 10000,
        winRate: 58.4
      },
      battles: {
        name: 'Battles',
        bets: 200,
        wagered: 15000,
        won: 15000,
        lost: 15000,
        profitLoss: 0,
        winRate: 50.0
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Statistics</h1>

      {/* Overall Stats */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Overall Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Bets</h3>
            <p className="text-2xl font-bold">{stats.overall.totalBets.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Wagered</h3>
            <p className="text-2xl font-bold">${stats.overall.totalWagered.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Win Rate</h3>
            <p className="text-2xl font-bold">{stats.overall.winRate}%</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Won</h3>
            <p className="text-2xl font-bold text-green-400">${stats.overall.totalWon.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Lost</h3>
            <p className="text-2xl font-bold text-red-400">${stats.overall.totalLost.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Profit/Loss</h3>
            <p className={`text-2xl font-bold ${stats.overall.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stats.overall.profitLoss.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Game-specific Stats */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Game Statistics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.values(stats.games).map((game) => (
            <div key={game.name} className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{game.name}</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Bets</span>
                  <span>{game.bets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wagered</span>
                  <span>${game.wagered.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Won</span>
                  <span className="text-green-400">${game.won.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lost</span>
                  <span className="text-red-400">${game.lost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Profit/Loss</span>
                  <span className={game.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                    ${game.profitLoss.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate</span>
                  <span>{game.winRate}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${game.winRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsPage; 