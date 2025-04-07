import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const PackItemManager = ({ items, onChange, houseEdge, packId, onSave, isEditing }) => {
    const [packItems, setPackItems] = useState(items || []);
    const [newItem, setNewItem] = useState({
        name: '',
        value: 0,
        odds: 0,
        image: '',
        rarity: 'COMMON'
    });
    const [error, setError] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const [isDirty, setIsDirty] = useState(false);
    const [totalCurrentOdds, setTotalCurrentOdds] = useState(0);

    useEffect(() => {
        setPackItems(items || []);
    }, [items]);

    useEffect(() => {
        onChange?.(packItems);
    }, [packItems, onChange]);

    useEffect(() => {
        const odds = calculateTotalOdds();
        setTotalCurrentOdds(odds);
        
        const ev = calculateEV();
        const recommendedPrice = (ev / (1 - (houseEdge || 0.1))).toFixed(2);
        if (!isDirty) {
            setPrice(recommendedPrice);
        }
    }, [packItems, houseEdge, isDirty]);

    const calculateTotalOdds = (items = packItems) => {
        return items.reduce((sum, item) => sum + Number(item.odds), 0);
    };

    const calculateEV = (items = packItems) => {
        return items.reduce((sum, item) => sum + (Number(item.value) * (Number(item.odds) / 100)), 0);
    };

    const handleAddItem = () => {
        if (!packId && !isEditing) {
            setError('You must create and save a pack first before adding items');
            return;
        }

        if (!newItem.name || Number(newItem.value) <= 0 || Number(newItem.odds) <= 0 || !newItem.image) {
            setError('Please fill in all required fields with valid values');
            return;
        }

        const totalOdds = calculateTotalOdds() + Number(newItem.odds);
        if (totalOdds > 100) {
            setError('Total odds cannot exceed 100%');
            return;
        }

        const updatedItems = [...packItems, { ...newItem, id: Date.now() }];
        setPackItems(updatedItems);
        setNewItem({ name: '', value: 0, odds: 0, image: '', rarity: 'COMMON' });
        setPreviewImage('');
        setError('');

        // Only automatically save changes in editing mode, and only if packId exists
        if (isEditing && packId && onSave) {
            // Don't auto-save if odds don't equal 100% - just update the items
            if (Math.abs(totalOdds - 100) <= 0.01) {
                handleSave(updatedItems);
            }
        }
    };

    const handleRemoveItem = (id) => {
        const updatedItems = packItems.filter(item => item.id !== id);
        setPackItems(updatedItems);
        setError('');

        // Only automatically save changes in editing mode, and only if packId exists
        if (isEditing && packId && onSave) {
            // Don't auto-save if odds don't equal 100% - just update the items
            const totalOdds = calculateTotalOdds(updatedItems);
            if (Math.abs(totalOdds - 100) <= 0.01) {
                handleSave(updatedItems);
            }
        }
    };

    const distributeRemainingOdds = () => {
        const totalOdds = calculateTotalOdds();
        if (totalOdds >= 100) return;
        
        if (!packItems.length) {
            setError('No items to distribute odds to');
            return;
        }

        const remaining = 100 - totalOdds;
        const itemCount = packItems.length;
        if (itemCount === 0) return;

        const distribution = remaining / itemCount;
        const updatedItems = packItems.map(item => ({
            ...item,
            odds: Number(item.odds) + distribution
        }));
        
        setPackItems(updatedItems);
        
        // Only automatically save changes in editing mode, and only if packId exists
        if (isEditing && packId && onSave) {
            handleSave(updatedItems);
        }
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setNewItem(prev => ({ ...prev, image: url }));
        setPreviewImage(url);
    };

    const handleExistingImageChange = (id, url) => {
        const updatedItems = packItems.map(item => 
            item.id === id ? { ...item, image: url } : item
        );
        setPackItems(updatedItems);
        
        // Only automatically save changes in editing mode, and only if packId exists
        if (isEditing && packId && onSave) {
            const totalOdds = calculateTotalOdds(updatedItems);
            if (Math.abs(totalOdds - 100) <= 0.01) {
                handleSave(updatedItems);
            }
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        setIsDirty(true);
    };

    const handleSave = async (updatedItems = packItems) => {
        if (!packId) {
            setError('No pack ID provided - create and save a pack first');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Calculate total odds and EV
            const totalOdds = calculateTotalOdds(updatedItems);
            const ev = calculateEV(updatedItems);

            // Validate total odds
            if (Math.abs(totalOdds - 100) > 0.01) {
                setError('The odds must sum to 100% to complete the pack');
                setLoading(false);
                return;
            }

            // Validate items
            if (updatedItems.length === 0) {
                setError('Pack must contain at least one item');
                setLoading(false);
                return;
            }

            // Validate price
            if (price <= 0) {
                setError('Price must be greater than 0');
                setLoading(false);
                return;
            }

            const packData = {
                items: updatedItems,
                totalOdds,
                ev,
                price: Number(price),
                minValue: Math.min(...updatedItems.map(item => Number(item.value))),
                maxValue: Math.max(...updatedItems.map(item => Number(item.value)))
            };

            await onSave(packData);
            setIsDirty(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const RARITY_COLORS = {
        COMMON: 'border-gray-400',
        RARE: 'border-blue-400',
        EPIC: 'border-purple-400',
        LEGENDARY: 'border-yellow-400',
        MYTHICAL: 'border-red-400'
    };

    return (
        <div className="mt-8 space-y-6">
            <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <h3 className="text-lg font-semibold mb-4">Pack Items</h3>
                
                {error && (
                    <div className="bg-red-900 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="space-y-2 mb-4">
                    <p className="text-sm">
                        Total Odds: <span className={Math.abs(totalCurrentOdds - 100) <= 0.01 ? 'text-green-400' : 'text-red-400'}>
                            {totalCurrentOdds.toFixed(2)}%
                        </span>
                        {totalCurrentOdds < 100 && (
                            <span className="text-yellow-400 ml-2">
                                ({(100 - totalCurrentOdds).toFixed(2)}% remaining)
                            </span>
                        )}
                    </p>
                    
                    <p className="text-sm">
                        Expected Value (EV): ${calculateEV().toFixed(2)}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                        <p className="text-sm">Pack Price: $</p>
                        <input
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            className="bg-gray-700 text-white rounded px-2 py-1 w-24"
                            min="0"
                            step="0.01"
                        />
                        <p className="text-xs text-gray-400">
                            (Recommended: ${(calculateEV() / (1 - (houseEdge || 0.1))).toFixed(2)})
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Item Name</label>
                        <input
                            type="text"
                            value={newItem.name}
                            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            placeholder="e.g. Common Skin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Value ($)</label>
                        <input
                            type="number"
                            value={newItem.value}
                            onChange={(e) => setNewItem(prev => ({ ...prev, value: Number(e.target.value) }))}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            placeholder="e.g. 1.50"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Odds (%)</label>
                        <input
                            type="number"
                            value={newItem.odds}
                            onChange={(e) => setNewItem(prev => ({ ...prev, odds: Number(e.target.value) }))}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            placeholder="e.g. 75"
                            min="0"
                            max="100"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Rarity</label>
                        <select
                            value={newItem.rarity}
                            onChange={(e) => setNewItem(prev => ({ ...prev, rarity: e.target.value }))}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        >
                            <option value="COMMON">Common</option>
                            <option value="RARE">Rare</option>
                            <option value="EPIC">Epic</option>
                            <option value="LEGENDARY">Legendary</option>
                            <option value="MYTHICAL">Mythical</option>
                        </select>
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                    <input
                        type="text"
                        value={newItem.image}
                        onChange={handleImageChange}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        placeholder="https://example.com/image.png"
                    />
                    {previewImage && (
                        <div className="mt-2">
                            <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded" />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleAddItem}
                        disabled={!packId && !isEditing}
                        className={`${(!packId && !isEditing) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white rounded px-4 py-2`}
                    >
                        Add Item
                    </button>
                    
                    <button
                        onClick={distributeRemainingOdds}
                        disabled={totalCurrentOdds >= 100 || packItems.length === 0}
                        className={`${totalCurrentOdds >= 100 || packItems.length === 0 ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded px-4 py-2`}
                    >
                        Distribute Remaining Odds
                    </button>
                </div>
            </div>
            
            {packItems.length > 0 && (
                <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Current Items ({packItems.length})</h3>
                    <div className="space-y-3">
                        {packItems.map((item, index) => (
                            <div key={item.id || index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                                <div className="flex items-center space-x-3">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded" />
                                    )}
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <div className="flex space-x-4 text-sm text-gray-400">
                                            <span>${Number(item.value).toFixed(2)}</span>
                                            <span>{Number(item.odds).toFixed(2)}%</span>
                                            <span className={
                                                item.rarity === 'COMMON' ? 'text-gray-400' :
                                                item.rarity === 'RARE' ? 'text-blue-400' :
                                                item.rarity === 'EPIC' ? 'text-purple-400' :
                                                item.rarity === 'LEGENDARY' ? 'text-yellow-400' :
                                                'text-red-400'
                                            }>
                                                {item.rarity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id || index)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {packItems.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                        {Math.abs(totalCurrentOdds - 100) > 0.01 ? (
                            <span className="text-yellow-400">⚠️ Total odds must equal 100% to save the pack</span>
                        ) : (
                            <span className="text-green-400">✓ Pack is valid and ready to save</span>
                        )}
                    </div>
                    
                    {isEditing && (
                        <button
                            onClick={() => handleSave()}
                            disabled={loading || Math.abs(totalCurrentOdds - 100) > 0.01}
                            className={`w-full ${loading ? 'bg-gray-500' : (Math.abs(totalCurrentOdds - 100) > 0.01 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600')} text-white rounded px-4 py-2 mt-2`}
                        >
                            {loading ? 'Saving...' : 'Save Pack'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PackItemManager; 