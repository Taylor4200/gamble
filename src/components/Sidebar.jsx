import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FireIcon,
  HomeIcon,
  CubeIcon,
  CurrencyDollarIcon,
  GiftIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import CasinoPage from "../pages/CasinoPage";
import adminPage from "../pages/AdminPage";
import SportsPage from "../pages/SportsPage";
import SlotsPage from "../pages/SlotsPage";
import HomePage from "../pages/HomePage";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (menu) => {
    setOpenDropdown(menu === openDropdown ? null : menu);
  };

  return (
    <aside className="bg-gray-900 text-gray-200 w-full md:w-72 min-h-screen py-6 px-4 space-y-4 overflow-y-auto">
      
      {/* Logo Area */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-center text-yellow-400 cursor-pointer">
          Bitch Bot
        </div>
      </div>

      {/* Single clickable menu item - No dropdown */}
      <div className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-800 transition">
        <HomeIcon className="w-6 h-6 mr-4 text-yellow-500"/>
        <span>Home</span>
      </div>

      {/* Dropdown example 1 */}
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

      {/* Dropdown example 2 */}
      <div>
        <div
          onClick={() => handleDropdownClick("sports")}
          className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          <div className="flex items-center">
            <TrophyIcon className="w-6 h-6 mr-4 text-green-400"/>
            <span>Sports</span>
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

      {/* Dropdown example 3 */}
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

      {/* Dropdown example 4 */}
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
      
      {/* Additional Dropdown Example */}
      {/* Use CubeIcon for variety, could represent more custom dropdown */}
      <div>
        <div
          onClick={() => handleDropdownClick("extras")}
          className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          <div className="flex items-center">
            <CubeIcon className="w-6 h-6 mr-4 text-pink-400"/>
            <span>Extras</span>
          </div>
          {openDropdown === "extras" ? (
            <ChevronUpIcon className="w-5"/>
          ) : (
            <ChevronDownIcon className="w-5"/>
          )}
        </div>
        {openDropdown === "extras" && (
          <div className="ml-10 mt-2 space-y-2">
            <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Leaderboard
            </div>
            <div className="p-2 cursor-pointer hover:text-white hover:bg-gray-800 rounded">
              Events
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;