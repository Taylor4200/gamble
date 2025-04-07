import React from 'react';

const PacksPage = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Packs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for pack cards */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-2">Coming Soon</h3>
                    <p className="text-gray-400">Packs section is under development</p>
                </div>
            </div>
        </div>
    );
};

export default PacksPage; 