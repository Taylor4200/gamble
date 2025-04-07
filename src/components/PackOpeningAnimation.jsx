import React, { useEffect, useState, useRef } from 'react';
import { generatePackResult } from '../utils/provablyFair';
import { gsap } from 'gsap';

const PackOpeningAnimation = ({ pack, serverSeed, clientSeed, nonce, onComplete }) => {
    const [winningItem, setWinningItem] = useState(null);
    const [items, setItems] = useState([]);
    const [specialSpinType, setSpecialSpinType] = useState(null);
    const [showSpecialPlaceholder, setShowSpecialPlaceholder] = useState(false);
    const [specialItems, setSpecialItems] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [isSpecialSpin, setIsSpecialSpin] = useState(false);
    const scrollContainerRef = useRef(null);
    const itemsContainerRef = useRef(null);
    const timelineRef = useRef(null);

    // Sound effects
    const playSound = (soundName) => {
        console.log(`Playing sound: ${soundName}`);
    };

    const createSpinSequence = (allItems, targetItem, isSpecial = false) => {
        const sequence = [];
        const sequenceLength = 300; // Adjusted number of items for a balanced scroll
        
        // Create multiple copies of the items array to ensure enough items
        const extendedItems = Array.from({ length: 10 }, () => allItems).flat();
        
        for (let i = 0; i < sequenceLength; i++) {
            const randomItem = extendedItems[Math.floor(Math.random() * extendedItems.length)];
            sequence.push(randomItem);
        }

        // Place the winning item near the end
        const targetPosition = Math.floor(sequenceLength * 0.9);
        sequence[targetPosition] = targetItem;

        return sequence;
    };

    const animateScroll = (targetItem, duration = 7) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const itemWidth = 208;
        const containerWidth = scrollContainerRef.current.clientWidth;
        const targetIndex = items.findIndex(item => item === targetItem);
        const targetPosition = (targetIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);

        // Reset position to start from the right
        gsap.set(itemsContainerRef.current, { x: containerWidth });

        // Create timeline with proper easing
        timelineRef.current = gsap.timeline({
            onComplete: () => {
                console.log('Animation completed');
            }
        });

        // Add the animation with custom easing
        timelineRef.current.to(itemsContainerRef.current, {
            x: -targetPosition,
            duration: duration,
            ease: "power4.out", // Slower start, smooth end
            force3D: true
        });

        return timelineRef.current;
    };

    const runRegularSpin = async () => {
        try {
            const result = await generatePackResult(serverSeed, clientSeed, nonce, pack.items);
            if (!result || !result.item) return;

            setWinningItem(result.item);
            const winningRarity = result.item.rarity?.toLowerCase();
            const isSpecialWin = winningRarity === 'legendary' || winningRarity === 'mythical';

            const sequence = createSpinSequence(pack.items, result.item);
            setItems(sequence);

            // Start the animation after a short delay
            setTimeout(() => {
                const timeline = animateScroll(result.item, 7); // Faster regular spin

                timeline.then(() => {
                    if (isSpecialWin) {
                        setShowSpecialPlaceholder(true);
                        playSound(`${winningRarity}_placeholder`);
                        setTimeout(() => {
                            setShowSpecialPlaceholder(false);
                            setIsSpecialSpin(true);
                            setSpecialSpinType(winningRarity);
                            
                            const specialItems = pack.items.filter(item => 
                                item.rarity?.toLowerCase() === winningRarity
                            );
                            
                            const specialSequence = createSpinSequence(specialItems, result.item, true);
                            setSpecialItems(specialSequence);
                            setConfetti(true);
                            playSound(`${winningRarity}_spin`);
                            
                            setTimeout(() => {
                                const specialTimeline = animateScroll(result.item, 2); // Even faster special spin
                                
                                specialTimeline.then(() => {
                                    setConfetti(false);
                                    setIsSpecialSpin(false);
                                    onComplete(result.item);
                                });
                            }, 100);
                        }, 1000);
                    } else {
                        onComplete(result.item);
                    }
                });
            }, 100);
        } catch (err) {
            console.error('Animation error:', err);
        }
    };

    // Cleanup GSAP animations on unmount
    useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    // Start the animation when the component mounts
    useEffect(() => {
        if (pack && pack.items && pack.items.length > 0) {
            runRegularSpin();
        }
    }, [pack, serverSeed, clientSeed, nonce]);

    const getRarityColor = (rarity) => {
        switch (rarity?.toLowerCase()) {
            case 'common': return 'border-gray-500';
            case 'rare': return 'border-blue-500';
            case 'epic': return 'border-purple-500';
            case 'legendary': return 'border-yellow-500';
            case 'mythical': return 'border-red-500';
            default: return 'border-gray-500';
        }
    };

    return (
        <div className="relative w-full h-64 overflow-hidden bg-gray-800 rounded-lg">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 z-10"></div>
            
            {!isSpecialSpin ? (
                <div
                    ref={scrollContainerRef}
                    className="absolute top-0 left-0 w-full h-full overflow-hidden"
                >
                    <div
                        ref={itemsContainerRef}
                        className="absolute top-0 left-0 flex items-center h-full"
                    >
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-48 h-48 mx-2 bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center border-2"
                                style={{ borderColor: getRarityColor(item.rarity).split('-')[1] }}
                            >
                                <div className="text-4xl mb-2">
                                    {item.image || '❓'}
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-green-400">
                                        ${typeof item.value === 'number' ? item.value.toFixed(2) : item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    ref={scrollContainerRef}
                    className="absolute top-0 left-0 w-full h-full overflow-hidden"
                >
                    <div
                        ref={itemsContainerRef}
                        className="absolute top-0 left-0 flex items-center h-full"
                    >
                        {specialItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-48 h-48 mx-2 bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center border-2"
                                style={{ borderColor: getRarityColor(item.rarity).split('-')[1] }}
                            >
                                <div className="text-4xl mb-2">{item.image || '❓'}</div>
                                <div className="text-center">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-green-400">
                                        ${typeof item.value === 'number' ? item.value.toFixed(2) : item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showSpecialPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="text-4xl font-bold text-white animate-pulse">
                        {specialSpinType === 'legendary' ? 'LEGENDARY SPIN' : 'MYTHIC SPIN'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackOpeningAnimation; 