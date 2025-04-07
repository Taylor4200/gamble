import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const BalanceDisplay = ({ userId }) => {
    const [balances, setBalances] = useState({
        btc: 0,
        eth: 0,
        usdt: 0,
        total: 0
    });

    useEffect(() => {
        if (!userId) return;

        // Subscribe to real-time balance updates
        const unsubscribe = onSnapshot(doc(db, 'users', userId), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                const balances = {
                    btc: data.btcBalance || 0,
                    eth: data.ethBalance || 0,
                    usdt: data.usdtBalance || 0,
                    total: data.totalBalance || 0
                };
                setBalances(balances);
            }
        });

        return () => unsubscribe();
    }, [userId]);

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <span className="text-yellow-500">₿</span>
                <span className="font-medium">{balances.btc.toFixed(8)}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-blue-500">Ξ</span>
                <span className="font-medium">{balances.eth.toFixed(8)}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-green-500">₮</span>
                <span className="font-medium">{balances.usdt.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2 border-l border-gray-600 pl-4">
                <span className="text-gray-400">Total:</span>
                <span className="font-bold text-white">${balances.total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default BalanceDisplay; 