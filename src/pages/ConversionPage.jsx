import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ConversionPage = () => {
    const { login, signup, error, setError } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [authData, setAuthData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleAuth = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (login(authData.username, authData.password)) {
                setAuthData({ username: '', password: '', confirmPassword: '' });
            }
        } else {
            if (signup(authData.username, authData.password, authData.confirmPassword)) {
                setAuthData({ username: '', password: '', confirmPassword: '' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-gray-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left side - Benefits */}
                    <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-2xl mr-2">🎮</span>
                                <div>
                                    <h3 className="font-semibold">Access All Games</h3>
                                    <p className="text-blue-100">Play our full collection of games</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-2xl mr-2">💬</span>
                                <div>
                                    <h3 className="font-semibold">Join the Chat</h3>
                                    <p className="text-blue-100">Connect with other players</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-2xl mr-2">🎁</span>
                                <div>
                                    <h3 className="font-semibold">Daily Rewards</h3>
                                    <p className="text-blue-100">Claim your daily bonuses</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-2xl mr-2">💰</span>
                                <div>
                                    <h3 className="font-semibold">Instant Deposits</h3>
                                    <p className="text-blue-100">Start playing in seconds</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right side - Auth Form */}
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                }}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                {isLogin ? 'Need an account?' : 'Already have an account?'}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-400 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={authData.username}
                                    onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={authData.password}
                                    onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter password"
                                />
                            </div>
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={authData.confirmPassword}
                                        onChange={(e) => setAuthData({ ...authData, confirmPassword: e.target.value })}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                By continuing, you agree to our{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversionPage; 