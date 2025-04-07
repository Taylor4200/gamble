import React from 'react';

const SlotsPage = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for slots games */}
                <div className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h3 className="text-white font-semibold">Coming Soon</h3>
                    <p className="text-gray-400">Exciting slots games are on their way!</p>
                </div>
            </div>
        </div>
    );
};

export default SlotsPage;