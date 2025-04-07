// src/pages/SportsPage.jsx
import React from 'react';

const SportsPage = () => {
    const sportsEvents = [
        {
            id: '1',
            title: 'Premier League',
            match: 'Liverpool vs Manchester United',
            time: '20:00',
            odds: '2.5'
        },
        {
            id: '2',
            title: 'La Liga',
            match: 'Real Madrid vs Barcelona',
            time: '21:00',
            odds: '1.95'
        },
        {
            id: '3',
            title: 'NBA',
            match: 'Lakers vs Warriors',
            time: '19:30',
            odds: '1.85'
        }
    ];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Sports Betting</h2>
            <div className="space-y-4">
                {sportsEvents.map(event => (
                    <div key={event.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold">{event.title}</h3>
                                <p className="text-gray-400">{event.match}</p>
                                <p className="text-gray-400 text-sm">{event.time}</p>
                            </div>
                            <div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                    {event.odds}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportsPage;