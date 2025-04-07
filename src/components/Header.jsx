import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an auth context
import BalanceDisplay from './BalanceDisplay';
import CryptoModal from './CryptoModal';

const Header = () => {
    const { user } = useAuth();
    const [showCryptoModal, setShowCryptoModal] = useState(false);

    return (
        <header className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo or title */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-white">Bitch Bot</h1>
                    </div>

                    {/* Right side - Balance and Deposit button */}
                    <div className="flex items-center space-x-6">
                        {user && (
                            <>
                                <BalanceDisplay userId={user.uid} />
                                <button
                                    onClick={() => setShowCryptoModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Deposit Crypto
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Crypto Modal */}
            {showCryptoModal && (
                <CryptoModal
                    isOpen={showCryptoModal}
                    onClose={() => setShowCryptoModal(false)}
                    userId={user?.uid}
                />
            )}
        </header>
    );
};

export default Header; 