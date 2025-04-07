import React, { useState } from 'react';

const BasketballPage = () => {
    const [selectedLeague, setSelectedLeague] = useState('all');

    const leagues = ['NBA', 'EuroLeague', 'NCAA', 'Spanish ACB', 'Turkish League'];
    
    const matches = [
        {
            id: '1',
            league: 'NBA',
            team1: 'LA Lakers',
            team2: 'Golden State Warriors',
            time: '20:30',
            date: '2024-04-10',
            odds: {
                team1Win: '1.90',
                team2Win: '1.85'
            },
            statistics: {
                team1: {
                    form: 'WLWWW',
                    points: '115.5',
                    rebounds: '44.3'
                },
                team2: {
                    form: 'WWLWW',
                    points: '118.2',
                    rebounds: '42.8'
                }
            }
        },
        {
            id: '2',
            league: 'EuroLeague',
            team1: 'Real Madrid',
            team2: 'Barcelona',
            time: '21:00',
            date: '2024-04-10',
            odds: {
                team1Win: '1.75',
                team2Win: '2.05'
            },
            statistics: {
                team1: {
                    form: 'WWWLW',
                    points: '85.3',
                    rebounds: '36.7'
                },
                team2: {
                    form: 'WLWWW',
                    points: '83.8',
                    rebounds: '35.2'
                }
            }
        }
    ];

    const filteredMatches = selectedLeague === 'all' 
        ? matches 
        : matches.filter(match => match.league === selectedLeague);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Basketball</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedLeague('all')}
                        className={`px-4 py-2 rounded ${
                            selectedLeague === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        All Leagues
                    </button>
                    {leagues.map(league => (
                        <button
                            key={league}
                            onClick={() => setSelectedLeague(league)}
                            className={`px-4 py-2 rounded ${
                                selectedLeague === league
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {league}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredMatches.map(match => (
                    <div key={match.id} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-blue-400 font-semibold">{match.league}</span>
                            <span className="text-gray-400 text-sm">
                                {match.date} - {match.time}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {['team1', 'team2'].map((team, index) => (
                                <div key={team} className={`text-center ${index === 1 ? 'border-l border-gray-700' : ''}`}>
                                    <h3 className="text-white font-semibold mb-4">{match[team]}</h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="text-xs text-gray-400">
                                            Form: {match.statistics[team].form.split('').map((result, i) => (
                                                <span key={i} className={`
                                                    inline-block w-5 h-5 mx-0.5 rounded-full 
                                                    ${result === 'W' ? 'bg-green-600' : 'bg-red-600'}
                                                    flex items-center justify-center
                                                `}>
                                                    {result}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-gray-400">PPG: </span>
                                            <span className="text-white">{match.statistics[team].points}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-gray-400">RPG: </span>
                                            <span className="text-white">{match.statistics[team].rebounds}</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                        {match.odds[`${team}Win`]}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end">
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

export default BasketballPage; 