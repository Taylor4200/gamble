import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const PackInventoryPage = () => {
    const { user } = useAuth();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setInventory(userData.inventory || []);
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [user]);

    const getRarityColor = (rarity) => {
        switch (rarity?.toLowerCase()) {
            case 'common': return 'text-gray-400';
            case 'rare': return 'text-blue-400';
            case 'epic': return 'text-purple-400';
            case 'legendary': return 'text-yellow-400';
            case 'mythical': return 'text-red-400';
            default: return 'text-white';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Inventory</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Total Value:</span>
                    <span className="text-xl font-bold text-green-400">
                        ${inventory.reduce((acc, item) => acc + (item.value || 0), 0).toFixed(2)}
                    </span>
                </div>
            </div>

            {inventory.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-xl font-semibold mb-2">Your inventory is empty</h2>
                    <p className="text-gray-400">Open some packs to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventory.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{item.image || '❓'}</div>
                                    <div>
                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                        <p className={`text-sm ${getRarityColor(item.rarity)}`}>
                                            {item.rarity || 'Common'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-400 font-bold">${item.value.toFixed(2)}</p>
                                    <p className="text-sm text-gray-400">{formatDate(item.timestamp)}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                From: {item.packName || 'Unknown Pack'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PackInventoryPage; 