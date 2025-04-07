import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import BalanceWidget from "./BalanceWidget";
import CashierModal from "./CashierModal";
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon, ChatBubbleLeftRightIcon, ChevronLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
    const { user, login, logout, signup, error, setError } = useAuth();
    const [showCashier, setShowCashier] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [isChatMinimized, setIsChatMinimized] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
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
                setShowAuthModal(false);
                setAuthData({ username: '', password: '', confirmPassword: '' });
            }
        } else {
            if (signup(authData.username, authData.password, authData.confirmPassword)) {
                setShowAuthModal(false);
                setAuthData({ username: '', password: '', confirmPassword: '' });
            }
        }
    };

    const handleChatClick = () => {
        if (!user) {
            setShowAuthModal(true);
            setIsLogin(true);
            setError(null);
            return;
        }
        setShowChat(!showChat);
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        {/* Add any left-side content here */}
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <BalanceWidget onDepositClick={() => setShowCashier(true)} />
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-2 text-gray-400 hover:text-white"
                                >
                                    <UserCircleIcon className="h-6 w-6" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => {
                                        setShowAuthModal(true);
                                        setIsLogin(true);
                                        setError(null);
                                    }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAuthModal(true);
                                        setIsLogin(false);
                                        setError(null);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleChatClick}
                            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                            title={user ? (showChat ? "Close Chat" : "Open Chat") : "Login to Chat"}
                        >
                            <ChatBubbleLeftRightIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>

            {/* Chat Panel - Only show if user is logged in */}
            {showChat && user && (
                <div className={`w-80 bg-gray-800 border-l border-gray-700 flex flex-col ${isChatMinimized ? 'w-12' : ''}`}>
                    <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4">
                        {!isChatMinimized && <span className="text-white font-medium">Chat</span>}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsChatMinimized(!isChatMinimized)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                                title={isChatMinimized ? "Maximize" : "Minimize"}
                            >
                                <ChevronLeftIcon className={`h-5 w-5 ${isChatMinimized ? 'rotate-180' : ''}`} />
                            </button>
                            <button
                                onClick={() => setShowChat(false)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                                title="Close"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    {!isChatMinimized && (
                        <div className="flex-1 p-4">
                            <div className="h-full bg-gray-900 rounded-lg p-4">
                                <div className="space-y-4">
                                    <div className="text-gray-400 text-sm">Chat messages will appear here</div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
                            <button
                                onClick={() => {
                                    setShowAuthModal(false);
                                    setError(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <XMarkIcon className="h-6 w-6" />
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
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                }}
                                className="w-full text-gray-400 hover:text-white text-sm"
                            >
                                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Cashier Modal */}
            {showCashier && <CashierModal onClose={() => setShowCashier(false)} />}
        </div>
    );
};

export default Layout;