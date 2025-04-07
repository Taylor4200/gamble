import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
            <div className="bg-gray-800 rounded-lg p-6">
                {user ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-gray-400 text-sm">Username</h3>
                            <p className="text-white text-lg">{user.username}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">Role</h3>
                            <p className="text-white text-lg">{user.role}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">User ID</h3>
                            <p className="text-white text-lg">{user.uid}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Please log in to view your profile</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage; 