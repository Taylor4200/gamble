import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const signup = (username, password, confirmPassword) => {
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return false;
        }

        // Mock signup - replace with your actual signup logic
        const newUser = {
            uid: `user-${Date.now()}`,
            username,
            role: 'user',
            balance: {
                btc: '0.00000000',
                eth: '0.00000000',
                usdt: '0.00'
            }
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
    };

    const login = (username, password) => {
        // Mock authentication - replace with your actual auth logic
        if (username === 'admin' && password === 'admin123') {
            const adminUser = {
                uid: 'admin-1',
                username: 'admin',
                role: 'admin',
                balance: {
                    btc: '1.00000000',
                    eth: '10.00000000',
                    usdt: '10000.00'
                }
            };
            setUser(adminUser);
            localStorage.setItem('user', JSON.stringify(adminUser));
            setError(null);
            return true;
        } else if (username === 'user' && password === 'user123') {
            const regularUser = {
                uid: 'user-1',
                username: 'user',
                role: 'user',
                balance: {
                    btc: '0.12345678',
                    eth: '1.23456789',
                    usdt: '1000.00'
                }
            };
            setUser(regularUser);
            localStorage.setItem('user', JSON.stringify(regularUser));
            setError(null);
            return true;
        }
        setError("Invalid username or password");
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setError(null);
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const value = {
        user,
        login,
        logout,
        signup,
        error,
        setError,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 