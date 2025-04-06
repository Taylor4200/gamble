// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { GAME_CATEGORIES, GAME_PROVIDERS } from '../constants/gameData'; // Add this import

const AdminPage = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({
        title: '',
        provider: GAME_PROVIDERS[0], // Default to first provider
        imageUrl: '',
        categories: [], // Changed from category to categories array
        isNew: false,
        odds: '',
        match: '',
        time: '',
    });
    const [editingGame, setEditingGame] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch games on component mount
    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            setIsLoading(true);
            const gamesCollection = collection(db, 'games');
            const gamesSnapshot = await getDocs(gamesCollection);
            const gamesList = gamesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGames(gamesList);
        } catch (err) {
            setError('Failed to fetch games');
            console.error('Error fetching games:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Add new game
    const handleAddGame = async (gameData) => {
        try {
            setIsLoading(true);
            const gameToAdd = {
                ...gameData,
                createdAt: new Date().toISOString()
            };

            const gamesCollection = collection(db, 'games');
            await addDoc(gamesCollection, gameToAdd);

            // Refresh games list
            await fetchGames();

            // Reset form
            setNewGame({
                title: '',
                provider: GAME_PROVIDERS[0],
                imageUrl: '',
                categories: [],
                isNew: false,
                odds: '',
                match: '',
                time: '',
            });

        } catch (err) {
            setError('Failed to add game');
            console.error('Error adding game:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Update existing game
    const handleUpdateGame = async (gameId, updatedData) => {
        try {
            setIsLoading(true);
            const gameRef = doc(db, 'games', gameId);
            await updateDoc(gameRef, {
                ...updatedData,
                updatedAt: new Date().toISOString()
            });

            // Refresh games list
            await fetchGames();

            // Reset editing state
            setEditingGame(null);

        } catch (err) {
            setError('Failed to update game');
            console.error('Error updating game:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete game
    const handleDeleteGame = async (gameId) => {
        if (!window.confirm('Are you sure you want to delete this game?')) {
            return;
        }

        try {
            setIsLoading(true);
            await deleteDoc(doc(db, 'games', gameId));
            await fetchGames();
        } catch (err) {
            setError('Failed to delete game');
            console.error('Error deleting game:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingGame) {
                await handleUpdateGame(editingGame.id, editingGame);
            } else {
                await handleAddGame(newGame);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">
                {editingGame ? 'Edit Game' : 'Add New Game'}
            </h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    {error}
                    <button onClick={() => setError(null)} className="ml-2 underline">
                        Dismiss
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block mb-2">Title:</label>
                    <input
                        type="text"
                        value={editingGame ? editingGame.title : newGame.title}
                        onChange={(e) => {
                            if (editingGame) {
                                setEditingGame({ ...editingGame, title: e.target.value });
                            } else {
                                setNewGame({ ...newGame, title: e.target.value });
                            }
                        }}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Provider:</label>
                    <select
                        value={editingGame ? editingGame.provider : newGame.provider}
                        onChange={(e) => {
                            if (editingGame) {
                                setEditingGame({ ...editingGame, provider: e.target.value });
                            } else {
                                setNewGame({ ...newGame, provider: e.target.value });
                            }
                        }}
                        className="w-full p-2 border rounded"
                        required
                    >
                        {GAME_PROVIDERS.map(provider => (
                            <option key={provider} value={provider}>
                                {provider}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Categories:</label>
                    <div className="space-y-2">
                        {Object.entries(GAME_CATEGORIES).map(([key, value]) => (
                            <label key={value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={editingGame
                                        ? editingGame.categories?.includes(value)
                                        : newGame.categories?.includes(value)}
                                    onChange={(e) => {
                                        const currentCategories = editingGame
                                            ? editingGame.categories || []
                                            : newGame.categories || [];

                                        const updatedCategories = e.target.checked
                                            ? [...currentCategories, value]
                                            : currentCategories.filter(cat => cat !== value);

                                        if (editingGame) {
                                            setEditingGame({ ...editingGame, categories: updatedCategories });
                                        } else {
                                            setNewGame({ ...newGame, categories: updatedCategories });
                                        }
                                    }}
                                    className="mr-2"
                                />
                                {key.replace('_', ' ')}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Image URL:</label>
                    <input
                        type="url"
                        value={editingGame ? editingGame.imageUrl : newGame.imageUrl}
                        onChange={(e) => {
                            if (editingGame) {
                                setEditingGame({ ...editingGame, imageUrl: e.target.value });
                            } else {
                                setNewGame({ ...newGame, imageUrl: e.target.value });
                            }
                        }}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-blue-600 text-white px-4 py-2 rounded 
            ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {isLoading ? 'Saving...' : editingGame ? 'Update Game' : 'Add Game'}
                </button>
            </form>

            <h2 className="text-xl font-bold mb-4">Games List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {games.map(game => (
                    <div key={game.id} className="p-4 border rounded shadow-md space-y-2">
                        <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-lg font-semibold">{game.title}</h3>
                        <p className="text-sm text-gray-500">{game.provider}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {game.categories?.map(category => (
                                <span key={category} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                                    {category.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 flex justify-between">
                            <button
                                onClick={() => setEditingGame(game)}
                                className="bg-yellow-500 text-white px-4 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteGame(game.id)}
                                className="bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
