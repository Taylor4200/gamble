// src/components/Auth.js
import React, { useState } from 'react';

const Auth = ({ onLogin, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    // Mock user data - In production, this would come from your backend
    const mockUserData = {
        username: 'CryptoKing',
        email: 'crypto@example.com',
        rank: 'Gold',
        wagered: 150000,
        balance: {
            BTC: 0.05,
            ETH: 1.5,
            USDT: 5000,
            BNB: 10,
            SOL: 50,
            DOGE: 10000
        },
        stats: {
            totalWagered: 150000,
            totalWon: 165000,
            totalLost: 135000,
            gamesPlayed: 1250
        },
        rankProgress: {
            current: 'Gold',
            next: 'Platinum',
            progress: 75,
            nextRequirement: 200000
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (!formData.email) {
                setError('Email is required for signup');
                return;
            }
            // Here you would typically make an API call to register the user
        }

        try {
            // Mock API call - In production, this would be a real API call
            const response = await mockLoginCall(formData);
            if (response.success) {
                // Pass the full user data to the parent component
                onLogin(response.userData);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError('An error occurred during authentication');
        }
    };

    // Mock API call function
    const mockLoginCall = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful login
                if (data.username && data.password) {
                    resolve({
                        success: true,
                        userData: mockUserData
                    });
                } else {
                    resolve({
                        success: false,
                        error: 'Invalid credentials'
                    });
                }
            }, 500);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    {isLogin ? 'Login' : 'Sign Up'} to Bitch Bot
                </h2>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;