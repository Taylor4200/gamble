import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FireIcon,
  HomeIcon,
  CurrencyDollarIcon,
  GiftIcon,
  TrophyIcon,
  ArchiveBoxIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();

  const handleDropdownClick = (menu) => {
    setOpenDropdown(menu === openDropdown ? null : menu);
  };

  return (
    <aside className="bg-gray-900 text-gray-200 w-full md:w-72 min-h-screen py-6 px-4 space-y-4 overflow-y-auto">
      {/* Logo Area */}
      <div className="mb-4">
        <Link to="/" className="text-2xl font-bold text-center text-yellow-400 cursor-pointer block">
          Bitch Bot
        </Link>
      </div>

      {/* Home */}
      <Link to="/" className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-800 transition">
        <HomeIcon className="w-6 h-6 mr-4 text-yellow-500"/>
        <span>Home</span>
      </Link>

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
            <Link to="/slots" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Slots
            </Link>
            <Link to="/live-casino" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Live Casino
            </Link>
            <Link to="/table-games" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Table Games
            </Link>
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
            <Link to="/sports/football" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Football
            </Link>
            <Link to="/sports/basketball" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Basketball
            </Link>
            <Link to="/sports/esports" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              ESports
            </Link>
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
            <Link to="/battles" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Active Battles
            </Link>
            <Link to="/battles/history" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Battle History
            </Link>
            <Link to="/battles/create" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Create Battle
            </Link>
          </div>
        )}
      </div>

      {/* Packs */}
      <div>
        <div
          onClick={() => handleDropdownClick("packs")}
          className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          <div className="flex items-center">
            <ArchiveBoxIcon className="w-6 h-6 mr-4 text-purple-400"/>
            <span>Packs</span>
          </div>
          {openDropdown === "packs" ? (
            <ChevronUpIcon className="w-5"/>
          ) : (
            <ChevronDownIcon className="w-5"/>
          )}
        </div>
        {openDropdown === "packs" && (
          <div className="ml-10 mt-2 space-y-2">
            <Link to="/packs/store" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Pack Store
            </Link>
            <Link to="/packs/inventory" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              My Inventory
            </Link>
            <Link to="/packs/history" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Opening History
            </Link>
          </div>
        )}
      </div>

      {/* Profile - Only visible when logged in */}
      {user && (
        <div>
          <div
            onClick={() => handleDropdownClick("profile")}
            className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center">
              <UserCircleIcon className="w-6 h-6 mr-4 text-green-400"/>
              <span>Profile</span>
            </div>
            {openDropdown === "profile" ? (
              <ChevronUpIcon className="w-5"/>
            ) : (
              <ChevronDownIcon className="w-5"/>
            )}
          </div>
          {openDropdown === "profile" && (
            <div className="ml-10 mt-2 space-y-2">
              <Link to="/profile" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                My Profile
              </Link>
              <Link to="/profile/stats" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Statistics
              </Link>
              <Link to="/profile/rank" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Rank
              </Link>
              <Link to="/profile/settings" className="block p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
                Settings
              </Link>
              <button
                onClick={logout}
                className="w-full text-left p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin - Only visible for admin users */}
      {user?.role === 'admin' && (
        <Link to="/admin" className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-800 transition">
          <CurrencyDollarIcon className="w-6 h-6 mr-4 text-red-400"/>
          <span>Admin Panel</span>
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;