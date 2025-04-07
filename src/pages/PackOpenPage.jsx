import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import PackOpeningAnimation from '../components/PackOpeningAnimation';
import { generateServerSeed, generateClientSeed, generateNonce } from '../utils/provablyFair';

const PackOpenPage = () => {
    const { packId } = useParams();
    const [pack, setPack] = useState(null);
    const [isOpening, setIsOpening] = useState(false);
    const [result, setResult] = useState(null);
    const [seeds, setSeeds] = useState(null);

    useEffect(() => {
        const fetchPack = async () => {
            if (!packId) return;
            
            const packDoc = await getDoc(doc(db, 'packs', packId));
            if (packDoc.exists()) {
                setPack({ id: packDoc.id, ...packDoc.data() });
            }
        };

        fetchPack();
    }, [packId]);

    const handleOpenPack = () => {
        // Generate new seeds for this opening
        const newSeeds = {
            serverSeed: generateServerSeed(),
            clientSeed: generateClientSeed(),
            nonce: generateNonce()
        };
        setSeeds(newSeeds);
        setIsOpening(true);
    };

    const handleAnimationComplete = (winningItem) => {
        setResult(winningItem);
        setIsOpening(false);
        // Here you would typically:
        // 1. Add the item to user's inventory
        // 2. Update user's balance
        // 3. Save the roll result to history
    };

    if (!pack) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
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
                        <div className="text-lg">Price: <span className="text-green-400">${pack.price.toFixed(2)}</span></div>
                    </div>
                </div>

                {/* Opening Animation */}
                {isOpening && seeds && (
                    <div className="mb-8">
                        <PackOpeningAnimation
                            pack={pack}
                            serverSeed={seeds.serverSeed}
                            clientSeed={seeds.clientSeed}
                            nonce={seeds.nonce}
                            onComplete={handleAnimationComplete}
                        />
                    </div>
                )}

                {/* Result Display */}
                {result && !isOpening && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center">
                        <h2 className="text-xl font-bold mb-4">You Won!</h2>
                        <div className="inline-block">
                            <div className={`w-40 h-40 mx-auto rounded-lg border-2 bg-gray-700 p-2
                                ${result.rarity === 'LEGENDARY' ? 'animate-bounce' : ''}
                                ${
                                    {
                                        COMMON: 'border-gray-400',
                                        RARE: 'border-blue-400',
                                        EPIC: 'border-purple-400',
                                        LEGENDARY: 'border-yellow-400',
                                        MYTHICAL: 'border-red-400'
                                    }[result.rarity]
                                }`}
                            >
                                <div className="w-full h-28 mb-2 rounded overflow-hidden">
                                    <img
                                        src={result.image}
                                        alt={result.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <div className="font-medium">{result.name}</div>
                                    <div className="text-green-400">${result.value.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Open Button */}
                {!isOpening && (
                    <button
                        onClick={handleOpenPack}
                        disabled={isOpening}
                        className="w-full bg-blue-500 text-white rounded-lg py-4 text-lg font-bold hover:bg-blue-600 
                            disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        {result ? 'Open Again' : 'Open Pack'}
                    </button>
                )}

                {/* Provably Fair Info */}
                {result && seeds && (
                    <div className="mt-8 bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Provably Fair</h3>
                        <div className="space-y-2 text-sm font-mono break-all">
                            <div>
                                <span className="text-gray-400">Server Seed:</span>
                                <span className="ml-2">{seeds.serverSeed}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Client Seed:</span>
                                <span className="ml-2">{seeds.clientSeed}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Nonce:</span>
                                <span className="ml-2">{seeds.nonce}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackOpenPage; 