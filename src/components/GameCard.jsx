import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GameCard = ({ game, showPlayers }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleGameClick = () => {
        if (!user) {
            navigate('/conversion');
            return;
        }

        // For now, just show an alert since we don't have the slot API
        alert('Coming soon! This game will be available shortly.');
        // TODO: When we have the slot API, we can implement:
        // window.open(game.url, '_blank') or navigate to a game-specific route
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div 
            className="group relative cursor-pointer"
            onClick={handleGameClick}
        >
            {/* Card Container */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-800">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                        <span className="text-gray-400 text-sm">Failed to load</span>
                    </div>
                ) : (
                    <img 
                        src={game.image} 
                        alt={game.title}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-medium text-sm truncate">{game.title}</h3>
                        <p className="text-gray-300 text-xs">{game.provider}</p>
                        {showPlayers && game.players && (
                            <div className="mt-1 text-xs text-green-400">
                                {game.players} playing
                            </div>
                        )}
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 right-2 flex gap-1">
                    {game.badge && (
                        <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                            game.badge === 'NEW' ? 'bg-green-500 text-white' :
                            game.badge === 'HOT' ? 'bg-red-500 text-white' :
                            game.badge === 'Exclusive' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                        }`}>
                            {game.badge}
                        </span>
                    )}
                    {game.multiplier && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-500 text-white">
                            {game.multiplier}x
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameCard; 