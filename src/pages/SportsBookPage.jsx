import React, { useState } from 'react';

const SportsBookPage = () => {
    const [selectedSport, setSelectedSport] = useState('all');

    const matches = [
        {
            id: '1',
            sport: 'football',
            team1: 'Manchester United',
            team2: 'Liverpool',
            time: '19:45',
            date: '2024-04-10',
            odds: {
                team1Win: '2.10',
                draw: '3.40',
                team2Win: '3.20'
            }
        },
        {
            id: '2',
            sport: 'basketball',
            team1: 'LA Lakers',
            team2: 'Golden State Warriors',
            time: '20:30',
            date: '2024-04-10',
            odds: {
                team1Win: '1.90',
                team2Win: '1.85'
            }
        },
        {
            id: '3',
            sport: 'esports',
            team1: 'Cloud9',
            team2: 'Team Liquid',
            time: '18:00',
            date: '2024-04-10',
            game: 'CS:GO',
            odds: {
                team1Win: '1.75',
                team2Win: '2.05'
            }
        }
    ];

    const filteredMatches = selectedSport === 'all' 
        ? matches 
        : matches.filter(match => match.sport === selectedSport);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sports Book</h2>
                <div className="flex gap-2">
                    {['all', 'football', 'basketball', 'esports'].map(sport => (
                        <button
                            key={sport}
                            onClick={() => setSelectedSport(sport)}
                            className={`px-4 py-2 rounded ${
                                selectedSport === sport
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {sport.charAt(0).toUpperCase() + sport.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredMatches.map(match => (
                    <div key={match.id} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="text-gray-400 text-sm">
                                    {match.date} - {match.time}
                                </span>
                                {match.game && (
                                    <span className="ml-2 text-blue-400 text-sm">
                                        {match.game}
                                    </span>
                                )}
                            </div>
                            <span className="text-gray-400 text-sm capitalize">
                                {match.sport}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h3 className="text-white font-semibold">{match.team1}</h3>
                                <button className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    {match.odds.team1Win}
                                </button>
                            </div>

                            {match.odds.draw && (
                                <div className="flex-1 text-center">
                                    <h3 className="text-white font-semibold">Draw</h3>
                                    <button className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                        {match.odds.draw}
                                    </button>
                                </div>
                            )}

                            <div className="flex-1 text-right">
                                <h3 className="text-white font-semibold">{match.team2}</h3>
                                <button className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    {match.odds.team2Win}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportsBookPage; 