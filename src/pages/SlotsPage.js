import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const SlotsPage = () => {
    const [slotGames, setSlotGames] = useState([]);

    useEffect(() => {
        const fetchSlotGames = async () => {
            try {
                const gamesRef = collection(db, 'games');
                const q = query(gamesRef, where('category', '==', 'slots'));
                const querySnapshot = await getDocs(q);

                const games = [];
                querySnapshot.forEach((doc) => {
                    games.push({ id: doc.id, ...doc.data() });
                });

                setSlotGames(games);
            } catch (error) {
                console.error("Error fetching slot games:", error);
            }
        };

        fetchSlotGames();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Slot Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slotGames.map(game => (
                    <div key={game.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform">
                        <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded" />
                        <h3 className="text-white mt-2">{game.title}</h3>
                        <p className="text-gray-400">{game.provider}</p>
                        {game.isNew && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">NEW</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlotsPage;