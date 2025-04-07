import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PackItemManager from '../../components/PackItemManager';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('games');
    const [games, setGames] = useState([]);
    const [packs, setPacks] = useState([]);
    const [editingGame, setEditingGame] = useState(null);
    const [editingPack, setEditingPack] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPackEditModal, setShowPackEditModal] = useState(false);
    const [globalHouseEdge, setGlobalHouseEdge] = useState(0.10); // 10% default house edge
    const [isCreatingNewPack, setIsCreatingNewPack] = useState(true);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);
    
    const [newGame, setNewGame] = useState({
        title: '',
        provider: '',
        image: '',
        categories: [],
        gameType: '',
        badge: '',
        minBet: '0.10',
        maxBet: '100.00',
        isLive: false,
        players: '0 playing'
    });

    const [newPack, setNewPack] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
        items: [],
        houseEdge: null,
        active: true,
        serverSeed: '',
        clientSeed: '',
        nonce: 0
    });

    // Available categories and options
    const CATEGORIES = {
        SECTIONS: ['HOME', 'NEW SLOTS'],
        GAME_TYPES: ['SLOTS', 'LIVE CASINO', 'TABLE GAMES', 'PACKS'],
        BADGES: ['HOT', 'NEW', 'POPULAR', 'EXCLUSIVE', 'ORIGINAL'],
        RARITIES: ['COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHICAL']
    };

    // Predefined game data
    const existingGames = [
        {
            title: 'Get The Cheese',
            provider: 'Hacksaw Gaming',
            image: 'https://i.postimg.cc/7LyQ8CnW/Screenshot-2025-04-05-205630.png',
            categories: ['HOME', 'NEW SLOTS'],
            gameType: 'SLOTS',
            badge: 'HOT'
        },
        {
            title: 'Sugar Bitch 1000',
            provider: 'Pragmatic Play',
            image: 'https://i.postimg.cc/gjN7HSpy/Screenshot-2025-04-05-203155.png',
            categories: ['HOME', 'NEW SLOTS'],
            gameType: 'SLOTS',
            badge: 'NEW'
        },
        {
            title: 'Gates Of My Dads A Bitch 1000',
            provider: 'Pragmatic Play',
            image: 'https://i.postimg.cc/HTq6NmWp/Screenshot-2025-04-05-201930.png',
            categories: ['HOME'],
            gameType: 'SLOTS',
            badge: 'POPULAR'
        },
        {
            title: 'Sweet BitchNanza 1000',
            provider: 'Pragmatic Play',
            image: 'https://i.postimg.cc/5tgcsqW3/Screenshot-2025-04-05-210027.png',
            categories: ['HOME', 'NEW SLOTS'],
            gameType: 'SLOTS',
            badge: 'EXCLUSIVE'
        },
        {
            title: 'Sugar Supreme PowerBitch',
            provider: 'Pragmatic Play',
            image: 'https://i.postimg.cc/3JqSt0vG/Screenshot-2025-04-05-204436.png',
            categories: ['HOME', 'NEW SLOTS'],
            gameType: 'SLOTS',
            badge: 'ORIGINAL'
        },
        {
            title: 'Hand Of BitchNubis',
            provider: 'Hacksaw Gaming',
            image: 'https://i.postimg.cc/JnZ29rjq/Screenshot-2025-04-05-203745.png',
            categories: ['HOME', 'NEW SLOTS'],
            gameType: 'SLOTS',
            badge: 'HOT'
        }
    ];

    // Badge color mapping
    const BADGE_COLORS = {
        'HOT': 'bg-red-500',
        'NEW': 'bg-green-500',
        'POPULAR': 'bg-blue-500',
        'EXCLUSIVE': 'bg-purple-500',
        'ORIGINAL': 'bg-yellow-500'
    };

    useEffect(() => {
        fetchGames();
        fetchPacks();
    }, []);

    const fetchGames = async () => {
        try {
            const gamesRef = collection(db, 'games');
            const snapshot = await getDocs(gamesRef);
            const gamesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGames(gamesData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const fetchPacks = async () => {
        try {
            const packsRef = collection(db, 'packs');
            const snapshot = await getDocs(packsRef);
            const packsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPacks(packsData);
        } catch (error) {
            console.error('Error fetching packs:', error);
        }
    };

    const handleInputChange = (e, isEdit = false) => {
        const { name, value, type, checked } = e.target;
        const updateFunc = isEdit ? setEditingGame : setNewGame;
        
        if (name === 'categories') {
            const categories = isEdit ? [...editingGame.categories] : [...(newGame.categories || [])];
            const category = value;
            
            if (checked) {
                categories.push(category);
            } else {
                const index = categories.indexOf(category);
                if (index > -1) {
                    categories.splice(index, 1);
                }
            }
            
            updateFunc(prev => ({
                ...prev,
                categories: categories
            }));
        } else {
            updateFunc(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handlePackInputChange = (e) => {
        const { name, value } = e.target;
        setNewPack(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const gameData = {
                ...newGame,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'games'), gameData);
            setNewGame({
                title: '',
                provider: '',
                image: '',
                categories: [],
                gameType: '',
                badge: '',
                minBet: '0.10',
                maxBet: '100.00',
                isLive: false,
                players: '0 playing'
            });
            fetchGames();
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    const handlePackSubmit = async (e) => {
        e.preventDefault();
        if (!newPack.name || !newPack.description || !newPack.image) {
            alert('Please fill in all required fields');
            return;
        }

        // Check if pack with same name already exists
        const existingPack = packs.find(p => p.name.toLowerCase() === newPack.name.toLowerCase());
        if (existingPack) {
            alert('A pack with this name already exists');
            return;
        }

        try {
            // Only set items if they exist and odds sum to 100%
            let packItems = [];
            let ev = 0;
            let price = 0;
            let minValue = 0;
            let maxValue = 0;

            // Create an empty pack first (without items)
            const packData = {
                ...newPack,
                items: [],  // Start with empty items
                price: 0,
                ev: 0,
                minValue: 0,
                maxValue: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const docRef = await addDoc(collection(db, 'packs'), packData);
            
            // Get the newly created pack ID and update the form
            const newPackWithId = { ...newPack, id: docRef.id, items: [] };
            setNewPack(newPackWithId);
            
            // Set editing state to allow adding items
            setEditingPack(newPackWithId);
            setShowPackEditModal(true);
            
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            
            fetchPacks();
        } catch (error) {
            console.error('Error adding pack:', error);
            alert('Error creating pack: ' + error.message);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const gameRef = doc(db, 'games', editingGame.id);
            await updateDoc(gameRef, editingGame);
            setShowEditModal(false);
            setEditingGame(null);
            fetchGames();
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    const handlePackEdit = async (e) => {
        e.preventDefault();

        if (!editingPack) return;

        // Validate total odds = 100%
        const totalOdds = editingPack.items.reduce((sum, item) => sum + Number(item.odds), 0);
        if (Math.abs(totalOdds - 100) > 0.01) {
            alert('Total odds must equal 100%');
            return;
        }

        try {
            const packRef = doc(db, 'packs', editingPack.id);
            const updatedPack = {
                ...editingPack,
                updatedAt: new Date()
            };
            await updateDoc(packRef, updatedPack);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            setShowPackEditModal(false);
            setEditingPack(null);
            fetchPacks();
        } catch (error) {
            console.error('Error updating pack:', error);
            alert('Error updating pack: ' + error.message);
        }
    };

    const handleDelete = async (gameId) => {
        try {
            await deleteDoc(doc(db, 'games', gameId));
            fetchGames();
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    const handlePackDelete = async (packId) => {
        if (!window.confirm('Are you sure you want to delete this pack?')) return;
        
        try {
            await deleteDoc(doc(db, 'packs', packId));
            fetchPacks();
        } catch (error) {
            console.error('Error deleting pack:', error);
        }
    };

    const startEdit = (game) => {
        setEditingGame(game);
        setShowEditModal(true);
    };

    const startPackEdit = (pack) => {
        setEditingPack(pack);
        setShowPackEditModal(true);
    };

    const importExistingGame = (game) => {
        setNewGame({
            ...newGame,
            ...game
        });
    };

    const handleEditPackInputChange = (e) => {
        const { name, value } = e.target;
        setEditingPack(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditPack = async (pack) => {
        setIsCreatingNewPack(false);
        setEditingPack(pack);
        setShowPackEditModal(true);
    };

    const handlePackSave = async (updatedPack) => {
        if (!editingPack || !editingPack.id) {
            alert('No pack selected');
            return;
        }
        
        try {
            const packRef = doc(db, 'packs', editingPack.id);
            
            // Validate odds sum to 100%
            const totalOdds = updatedPack.totalOdds;
            if (Math.abs(totalOdds - 100) > 0.01) {
                alert('The odds must sum to 100% to complete the pack');
                return;
            }
            
            await updateDoc(packRef, {
                ...updatedPack,
                updatedAt: new Date()
            });
            
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            fetchPacks();
        } catch (error) {
            console.error('Error updating pack:', error);
            alert('Error updating pack: ' + error.message);
        }
    };

    const renderGameForm = (formData, isEdit = false, onSubmit) => {
        const handleChange = (e) => handleInputChange(e, isEdit);
        
        return (
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Provider</label>
                        <select
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            required
                        >
                            <option value="">Select Provider</option>
                            <option value="Pragmatic Play">Pragmatic Play</option>
                            <option value="Hacksaw Gaming">Hacksaw Gaming</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Game Type</label>
                        <select
                            name="gameType"
                            value={formData.gameType}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            required
                        >
                            <option value="">Select Game Type</option>
                            {CATEGORIES.GAME_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Badge</label>
                        <select
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        >
                            <option value="">No Badge</option>
                            {CATEGORIES.BADGES.map(badge => (
                                <option key={badge} value={badge}>{badge}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Min Bet</label>
                        <input
                            type="text"
                            name="minBet"
                            value={formData.minBet}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            placeholder="0.10"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Max Bet</label>
                        <input
                            type="text"
                            name="maxBet"
                            value={formData.maxBet}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            placeholder="100.00"
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <label className="block text-gray-400 mb-1">Categories</label>
                        <div className="flex flex-wrap gap-4">
                            {CATEGORIES.SECTIONS.map((category) => (
                                <label key={category} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="categories"
                                        value={category}
                                        checked={formData.categories?.includes(category)}
                                        onChange={handleChange}
                                        className="bg-gray-700 text-blue-500 rounded"
                                    />
                                    <span className="text-gray-400">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    {isEdit && (
                        <button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        {isEdit ? 'Save Changes' : 'Add Game'}
                    </button>
                </div>
            </form>
        );
    };

    const renderPackForm = (formData, isEdit = false, onSubmit) => {
        return (
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handlePackInputChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                            disabled={isEdit}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Image URL/Emoji</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handlePackInputChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handlePackInputChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        rows="3"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">House Edge (%)</label>
                        <input
                            type="number"
                            name="houseEdge"
                            value={formData.houseEdge !== null ? formData.houseEdge * 100 : ''}
                            onChange={(e) => {
                                const value = e.target.value === '' ? null : Number(e.target.value) / 100;
                                if (isEdit) {
                                    setEditingPack(prev => ({
                                        ...prev,
                                        houseEdge: value
                                    }));
                                } else {
                                    setNewPack(prev => ({
                                        ...prev,
                                        houseEdge: value
                                    }));
                                }
                            }}
                            placeholder={`Global: ${globalHouseEdge * 100}%`}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Status</label>
                        <select
                            name="active"
                            value={formData.active}
                            onChange={handlePackInputChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    </div>
                </div>

                {!isEdit && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Create Pack
                        </button>
                    </div>
                )}

                {formData.id && (
                    <PackItemManager
                        items={formData.items || []}
                        onChange={(items) => {
                            if (isEdit) {
                                setEditingPack(prev => ({ ...prev, items }));
                            } else {
                                setNewPack(prev => ({ ...prev, items }));
                            }
                        }}
                        houseEdge={formData.houseEdge !== null ? formData.houseEdge : globalHouseEdge}
                        packId={formData.id}
                        isEditing={true}
                        onSave={handlePackSave}
                    />
                )}
            </form>
        );
    };

    const renderEditPackForm = () => {
        if (!editingPack) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Edit Pack: {editingPack.name}</h3>
                        <button
                            onClick={() => {
                                setShowPackEditModal(false);
                                setEditingPack(null);
                                // Reset new pack form when closing edit modal
                                setNewPack({
                                    name: '',
                                    description: '',
                                    price: 0,
                                    image: '',
                                    items: [],
                                    houseEdge: null,
                                    active: true,
                                    serverSeed: '',
                                    clientSeed: '',
                                    nonce: 0
                                });
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {renderPackForm(editingPack, true, handlePackEdit)}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => {
                                setShowPackEditModal(false);
                                setEditingPack(null);
                                // Reset new pack form when closing edit modal
                                setNewPack({
                                    name: '',
                                    description: '',
                                    price: 0,
                                    image: '',
                                    items: [],
                                    houseEdge: null,
                                    active: true,
                                    serverSeed: '',
                                    clientSeed: '',
                                    nonce: 0
                                });
                            }}
                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`px-4 py-2 rounded ${activeTab === 'games' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Games
                    </button>
                    <button
                        onClick={() => setActiveTab('packs')}
                        className={`px-4 py-2 rounded ${activeTab === 'packs' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Packs
                    </button>
                </div>
            </div>

            {activeTab === 'games' ? (
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Admin Panel</h2>
                    
                    {/* Quick Import Section */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Import</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {existingGames.map((game, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg p-4">
                                    <div className="relative">
                                        <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded mb-2" />
                                        {game.badge && (
                                            <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white ${BADGE_COLORS[game.badge]}`}>
                                                {game.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-white font-medium">{game.title}</h4>
                                    <p className="text-gray-400 text-sm mb-2">{game.provider}</p>
                                    <button
                                        onClick={() => importExistingGame(game)}
                                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Import
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Game Form */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Add New Game</h3>
                        {renderGameForm(newGame, false, handleSubmit)}
                    </div>

                    {/* Games List */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Existing Games</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {games.map(game => (
                                <div key={game.id} className="bg-gray-800 rounded-lg p-4">
                                    <div className="aspect-[4/3] relative mb-3">
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-full object-cover rounded"
                                        />
                                        {game.badge && (
                                            <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white ${BADGE_COLORS[game.badge]}`}>
                                                {game.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-white font-medium">{game.title}</h4>
                                    <p className="text-gray-400 text-sm">{game.provider}</p>
                                    <p className="text-gray-400 text-sm">Type: {game.gameType}</p>
                                    <p className="text-gray-400 text-sm">Bet Range: {game.minBet} - {game.maxBet}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {game.categories?.map(category => (
                                            <span key={category} className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => startEdit(game)}
                                            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(game.id)}
                                            className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Edit Modal */}
                    {showEditModal && editingGame && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-white">Edit Game</h3>
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                {renderGameForm(editingGame, true, handleEdit)}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Pack Management</h2>
                        <div className="flex items-center space-x-4">
                            <label className="text-sm text-gray-400">Global House Edge:</label>
                            <input
                                type="number"
                                value={globalHouseEdge * 100}
                                onChange={(e) => setGlobalHouseEdge(Number(e.target.value) / 100)}
                                className="w-20 bg-gray-700 text-white rounded px-2 py-1"
                                min="0"
                                max="100"
                                step="0.1"
                            />
                            <span className="text-gray-400">%</span>
                        </div>
                    </div>
                    
                    {/* Create New Pack Form */}
                    <div className="bg-gray-800 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold mb-4">Create New Pack</h3>
                        {renderPackForm(newPack, false, handlePackSubmit)}
                    </div>

                    {/* Pack List */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Existing Packs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {packs.map(pack => (
                                <div key={pack.id} className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold">{pack.name}</h4>
                                            <p className="text-sm text-gray-400">{pack.description}</p>
                                        </div>
                                        <div className="text-2xl">{pack.image || '🎁'}</div>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <p>Items: {pack.items.length}</p>
                                        <p>House Edge: {(pack.houseEdge || globalHouseEdge) * 100}%</p>
                                        <p>Status: <span className={pack.active ? 'text-green-400' : 'text-red-400'}>
                                            {pack.active ? 'Active' : 'Inactive'}
                                        </span></p>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingPack(pack);
                                                setShowPackEditModal(true);
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handlePackDelete(pack.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Pack Edit Modal */}
            {showPackEditModal && editingPack && renderEditPackForm()}

            {saveSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Pack saved successfully!
                </div>
            )}
        </div>
    );
};

export default AdminPage; 