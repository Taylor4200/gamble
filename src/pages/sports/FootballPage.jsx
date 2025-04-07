import React, { useState } from 'react';

const FootballPage = () => {
    const [selectedLeague, setSelectedLeague] = useState('all');

    const leagues = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];
    
    const matches = [
        {
            id: '1',
            league: 'Premier League',
            team1: 'Manchester United',
            team2: 'Liverpool',
            time: '19:45',
            date: '2024-04-10',
            odds: {
                team1Win: '2.10',
                draw: '3.40',
                team2Win: '3.20'
            },
            statistics: {
                team1Form: 'WWDLW',
                team2Form: 'DWWWD'
            }
        },
        {
            id: '2',
            league: 'La Liga',
            team1: 'Real Madrid',
            team2: 'Barcelona',
            time: '20:00',
            date: '2024-04-10',
            odds: {
                team1Win: '2.30',
                draw: '3.20',
                team2Win: '2.90'
            },
            statistics: {
                team1Form: 'WWWDW',
                team2Form: 'WDWWW'
            }
        }
    ];

    const filteredMatches = selectedLeague === 'all' 
        ? matches 
        : matches.filter(match => match.league === selectedLeague);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Football</h2>
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

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <h3 className="text-white font-semibold mb-2">{match.team1}</h3>
                                <div className="text-xs text-gray-400 mb-2">
                                    Form: {match.statistics.team1Form.split('').map((result, i) => (
                                        <span key={i} className={`
                                            inline-block w-5 h-5 mx-0.5 rounded-full 
                                            ${result === 'W' ? 'bg-green-600' : result === 'D' ? 'bg-yellow-600' : 'bg-red-600'}
                                            flex items-center justify-center
                                        `}>
                                            {result}
                                        </span>
                                    ))}
                                </div>
                                <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    {match.odds.team1Win}
                                </button>
                            </div>

                            <div className="text-center">
                                <h3 className="text-white font-semibold mb-2">Draw</h3>
                                <div className="h-8"></div> {/* Spacer to align with team buttons */}
                                <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    {match.odds.draw}
                                </button>
                            </div>

                            <div className="text-center">
                                <h3 className="text-white font-semibold mb-2">{match.team2}</h3>
                                <div className="text-xs text-gray-400 mb-2">
                                    Form: {match.statistics.team2Form.split('').map((result, i) => (
                                        <span key={i} className={`
                                            inline-block w-5 h-5 mx-0.5 rounded-full 
                                            ${result === 'W' ? 'bg-green-600' : result === 'D' ? 'bg-yellow-600' : 'bg-red-600'}
                                            flex items-center justify-center
                                        `}>
                                            {result}
                                        </span>
                                    ))}
                                </div>
                                <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    {match.odds.team2Win}
                                </button>
                            </div>
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

export default FootballPage; 