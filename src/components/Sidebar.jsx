import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FireIcon,
  HomeIcon,
  CurrencyDollarIcon,
  GiftIcon,
  TrophyIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import Auth from './Auth'; // Import the Auth component

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user
  const [showAuthModal, setShowAuthModal] = useState(false); // Track if Auth modal is open

  const handleDropdownClick = (menu) => {
    setOpenDropdown(menu === openDropdown ? null : menu);
  };

  const handleLogin = (username) => {
    // Mock login logic: Assume the logged-in user is an admin for now
    setLoggedInUser({ username, role: 'admin' }); // Set user role to "admin"
    setShowAuthModal(false); // Close the Auth modal
  };

  const handleLogout = () => {
    setLoggedInUser(null); // Clear logged-in user
  };

  return (
    <>
      {/* Show Auth modal if not logged in */}
      {showAuthModal && (
        <Auth
          onLogin={handleLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <aside className="bg-gray-900 text-gray-200 w-full md:w-72 min-h-screen py-6 px-4 space-y-4 overflow-y-auto">
        
        {/* Logo Area */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-center text-yellow-400 cursor-pointer">
            Bitch Bot
          </div>
        </div>

        {/* Home */}
        <div className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-800 transition">
          <HomeIcon className="w-6 h-6 mr-4 text-yellow-500"/>
          <span>Home</span>
        </div>

        {/* Games */}
        <div>
          <div
            onClick={() => handleDropdownClick("games")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <FireIcon className="w-6 h-6 mr-4 text-orange-400"/>
              <span>Games</span>
            </div>
            {openDropdown === "games" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "games" && (
            <div className="ml-10 mt-2 space-y-2">
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Slots
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Live Casino
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Table Games
              </div>
            </div>
          )}
        </div>

        {/* Sports */}
        <div>
          <div
            onClick={() => handleDropdownClick("sports")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <TrophyIcon className="w-6 h-6 mr-4 text-green-400"/>
              <span>Sports Book</span>
            </div>
            {openDropdown === "sports" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "sports" && (
            <div className="ml-10 mt-2 space-y-2">
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Football
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Basketball
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                ESports
              </div>
            </div>
          )}
        </div>

        {/* Battles */}
        <div>
          <div
            onClick={() => handleDropdownClick("battles")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <ArchiveBoxIcon className="w-6 h-6 mr-4 text-pink-400"/>
              <span>Battles</span>
            </div>
            {openDropdown === "battles" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "battles" && (
            <div className="ml-10 mt-2 space-y-2">
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Packs
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Battles
              </div>
            </div>
          )}
        </div>

        {/* Crypto */}
        <div>
          <div
            onClick={() => handleDropdownClick("crypto")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-6 h-6 mr-4 text-blue-400"/>
              <span>Crypto</span>
            </div>
            {openDropdown === "crypto" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "crypto" && (
            <div className="ml-10 mt-2 space-y-2">
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Wallet
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Deposit
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Withdraw
              </div>
            </div>
          )}
        </div>

        {/* Promotions */}
        <div>
          <div
            onClick={() => handleDropdownClick("promotions")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <GiftIcon className="w-6 h-6 mr-4 text-purple-400"/>
              <span>Promotions</span>
            </div>
            {openDropdown === "promotions" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "promotions" && (
            <div className="ml-10 mt-2 space-y-2">
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Daily Rewards
              </div>
              <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Weekly Bonuses
              </div>
            </div>
          )}
        </div>

        {/* Admin (Visible only when logged in and user is admin) */}
        {loggedInUser && loggedInUser.role === "admin" && (
          <div className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-800 transition">
            <ArchiveBoxIcon className="w-6 h-6 mr-4 text-red-400"/>
            <span>Admin</span>
          </div>
        )}

        {/* Login/Logout Button */}
        <div className="mt-4">
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;