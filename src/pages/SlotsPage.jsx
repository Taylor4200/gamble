import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import GameCard from '../components/GameCard';

const SlotsPage = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesRef = collection(db, 'games');
                const querySnapshot = await getDocs(gamesRef);
                const gamesData = [];
                querySnapshot.forEach((doc) => {
                    gamesData.push({ id: doc.id, ...doc.data() });
                });
                // Filter for slot games only
                const slotGames = gamesData.filter(game => game.gameType === 'SLOTS');
                setGames(slotGames);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    // Filter games based on search term and provider
    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProvider = !selectedProvider || game.provider === selectedProvider;
        return matchesSearch && matchesProvider;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Slots</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Providers</option>
                        <option value="Pragmatic Play">Pragmatic Play</option>
                        <option value="Hacksaw Gaming">Hacksaw Gaming</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="text-center text-gray-400">Loading games...</div>
            ) : filteredGames.length === 0 ? (
                <div className="text-center text-gray-400">No games found</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} showPlayers={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SlotsPage;