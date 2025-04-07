import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import PackOpeningAnimation from '../../components/PackOpeningAnimation';
import { generateSeed } from '../../utils/provablyFair';

const PackOpenPage = () => {
    const { packId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pack, setPack] = useState(null);
    const [isOpening, setIsOpening] = useState(false);
    const [result, setResult] = useState(null);
    const [seeds, setSeeds] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPack = async () => {
            if (!packId) return;
            
            try {
                const packDoc = await getDoc(doc(db, 'packs', packId));
                if (packDoc.exists()) {
                    setPack({ id: packDoc.id, ...packDoc.data() });
                } else {
                    setError('Pack not found');
                }
            } catch (err) {
                setError('Error loading pack');
                console.error('Error fetching pack:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPack();
    }, [packId]);

    const handleOpenPack = async () => {
        if (!user) {
            setError('Please log in to open packs');
            return;
        }

        if (user.balance < pack.price) {
            setError('Insufficient balance');
            return;
        }

        try {
            setIsOpening(true);
            setError(null);

            // Check if user document exists
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Create user document if it doesn't exist
                await setDoc(userRef, {
                    balance: 0,
                    createdAt: new Date(),
                    username: user.displayName || user.email?.split('@')[0] || 'Anonymous'
                });
            }

            // Generate seeds
            const serverSeed = generateSeed();
            const clientSeed = generateSeed();
            const nonce = Date.now();

            // Update user balance
            await updateDoc(userRef, {
                balance: user.balance - pack.price
            });

            // Store the seeds for the animation
            setSeeds({ serverSeed, clientSeed, nonce });
            
            // We'll let the animation component handle generating the result
        } catch (err) {
            setError(err.message);
            setIsOpening(false);
        }
    };

    const handleAnimationComplete = async (winningItem) => {
        if (!user || !pack) return;
        
        if (!winningItem) {
            setIsOpening(false);
            return;
        }

        try {
            // Add item to user's inventory
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            
            const currentInventory = userDoc.exists() ? (userDoc.data().inventory || []) : [];
            
            await updateDoc(userRef, {
                inventory: [...currentInventory, {
                    ...winningItem,
                    timestamp: new Date().toISOString(),
                    packId: pack.id,
                    packName: pack.name
                }]
            });

            // Record the opening
            const openingsRef = collection(db, 'pack_openings');
            await addDoc(openingsRef, {
                userId: user.uid,
                username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
                packId: pack.id,
                packName: pack.name,
                packImage: pack.image,
                item: winningItem,
                profit: winningItem.value - pack.price,
                timestamp: new Date().toISOString(),
                isPublic: true
            });

            setResult(winningItem);
            setIsOpening(false);
            // Reset seeds to prevent reusing the same seeds
            setSeeds(null);
        } catch (err) {
            setError('Error saving result');
            console.error('Error saving pack opening:', err);
            setIsOpening(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-500 text-white p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!pack) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-gray-800 text-white p-4 rounded-lg">
                    Pack not found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/packstore')}
                    className="mb-6 text-gray-400 hover:text-white transition"
                >
                    ← Back to Store
                </button>

                {/* Pack Info */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">{pack.image || '🎁'}</div>
                        <div>
                            <h1 className="text-2xl font-bold">{pack.name}</h1>
                            <p className="text-gray-400">{pack.description}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-lg">Price: <span className="text-green-400">${Number(pack.price).toFixed(2)}</span></div>
                    </div>
                </div>

                {/* Items Preview */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Possible Items</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pack.items && pack.items.map((item, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <div className="text-2xl mb-2">{item.image || '❓'}</div>
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-green-400">${Number(item.value).toFixed(2)}</div>
                                <div className="text-sm text-gray-400">{Number(item.odds).toFixed(2)}% chance</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Opening Animation */}
                {isOpening && seeds && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="w-full max-w-4xl">
                            <PackOpeningAnimation
                                pack={pack}
                                serverSeed={seeds.serverSeed}
                                clientSeed={seeds.clientSeed}
                                nonce={seeds.nonce}
                                onComplete={handleAnimationComplete}
                            />
                        </div>
                    </div>
                )}

                {/* Result Display */}
                {result && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg max-w-md text-center">
                            <div className="text-6xl mb-4">{result.image || '🎉'}</div>
                            <h2 className="text-2xl font-bold mb-2">You won!</h2>
                            <p className="text-xl mb-4">{result.name}</p>
                            <p className="text-green-400 text-xl mb-6">${Number(result.value).toFixed(2)}</p>
                            <button
                                onClick={() => setResult(null)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Open Pack Button */}
                {!isOpening && !result && (
                    <div className="text-center">
                        <button
                            onClick={handleOpenPack}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-bold hover:bg-blue-700 transition"
                        >
                            Open Pack - ${Number(pack.price).toFixed(2)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackOpenPage; 