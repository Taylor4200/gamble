import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import GameCard from '../components/GameCard';

const TableGamesPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        fetchTableGames();
    }, []);

    const fetchTableGames = async () => {
        try {
            const gamesRef = collection(db, 'games');
            const querySnapshot = await getDocs(gamesRef);
            const gamesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Filter for table games
            const tableGames = gamesData.filter(game => game.gameType === 'TABLE GAMES');
            setGames(tableGames);
        } catch (error) {
            console.error('Error fetching table games:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !selectedType || game.title.toLowerCase().includes(selectedType.toLowerCase());
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Table Games</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Games</option>
                        <option value="blackjack">Blackjack</option>
                        <option value="roulette">Roulette</option>
                        <option value="baccarat">Baccarat</option>
                        <option value="poker">Poker</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredGames.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>No table games found.</p>
                    <p className="text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
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

export default TableGamesPage; 