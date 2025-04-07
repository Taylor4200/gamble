import React, { useState } from 'react';

const ESportsPage = () => {
    const [selectedGame, setSelectedGame] = useState('all');

    const games = ['CS:GO', 'Dota 2', 'League of Legends', 'Valorant', 'Overwatch'];
    
    const matches = [
        {
            id: '1',
            game: 'CS:GO',
            tournament: 'ESL Pro League',
            team1: {
                name: 'Cloud9',
                logo: '🌩️',
                rank: '#4',
                recentResults: ['W', 'W', 'L', 'W', 'W']
            },
            team2: {
                name: 'Team Liquid',
                logo: '💧',
                rank: '#3',
                recentResults: ['W', 'W', 'W', 'L', 'W']
            },
            time: '18:00',
            date: '2024-04-10',
            format: 'BO3',
            odds: {
                team1Win: '1.85',
                team2Win: '1.95'
            }
        },
        {
            id: '2',
            game: 'League of Legends',
            tournament: 'LEC Spring Split',
            team1: {
                name: 'G2 Esports',
                logo: '⚔️',
                rank: '#1',
                recentResults: ['W', 'W', 'W', 'W', 'L']
            },
            team2: {
                name: 'Fnatic',
                logo: '🧡',
                rank: '#2',
                recentResults: ['W', 'L', 'W', 'W', 'W']
            },
            time: '20:00',
            date: '2024-04-10',
            format: 'BO5',
            odds: {
                team1Win: '1.65',
                team2Win: '2.20'
            }
        }
    ];

    const filteredMatches = selectedGame === 'all' 
        ? matches 
        : matches.filter(match => match.game === selectedGame);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">ESports</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedGame('all')}
                        className={`px-4 py-2 rounded ${
                            selectedGame === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        All Games
                    </button>
                    {games.map(game => (
                        <button
                            key={game}
                            onClick={() => setSelectedGame(game)}
                            className={`px-4 py-2 rounded ${
                                selectedGame === game
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {game}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredMatches.map(match => (
                    <div key={match.id} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="text-blue-400 font-semibold">{match.game}</span>
                                <span className="text-gray-400 mx-2">|</span>
                                <span className="text-purple-400">{match.tournament}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">
                                    {match.date} - {match.time}
                                </span>
                                <span className="bg-gray-700 text-white text-sm px-2 py-1 rounded">
                                    {match.format}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {['team1', 'team2'].map((team, index) => (
                                <div key={team} className={`text-center ${index === 1 ? 'border-l border-gray-700' : ''}`}>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-2xl">{match[team].logo}</span>
                                        <h3 className="text-white font-semibold">{match[team].name}</h3>
                                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                            Rank {match[team].rank}
                                        </span>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <div className="text-xs text-gray-400">
                                            Recent: {match[team].recentResults.map((result, i) => (
                                                <span key={i} className={`
                                                    inline-block w-5 h-5 mx-0.5 rounded-full 
                                                    ${result === 'W' ? 'bg-green-600' : 'bg-red-600'}
                                                    flex items-center justify-center
                                                `}>
                                                    {result}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                        {match.odds[`${team}Win`]}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <button className="text-gray-400 text-sm hover:text-gray-300">
                                Match Statistics 📊
                            </button>
                            <button className="text-blue-400 text-sm hover:text-blue-300">
                                View More Markets →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ESportsPage; 