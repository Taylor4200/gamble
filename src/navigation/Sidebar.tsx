import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const menuItems = [
        { label: 'Home', icon: '🏠', path: '/' },
        { label: 'Sportsbook', icon: '⚽', path: '/sports' },
        { label: 'Slots', icon: '🎰', path: '/slots' },
        { label: 'Live Casino', icon: '🎲', path: '/live-casino' },
        { label: 'Rewards', icon: '🎁', path: '/rewards' },
    ];

    return (
        <div className="w-64 bg-gray-800 h-screen flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-white">GambleMaster</h1>
            </div>

            <nav className="flex-1">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;