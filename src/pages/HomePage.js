// ...all your existing imports
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Auth from '../components/Auth';
import SlotsPage from '../pages/SlotsPage';
import CasinoPage from '../pages/CasinoPage';
import SportsPage from '../pages/SportsPage';
import AdminPage from '../pages/AdminPage';

const HomePage = () => {
  // All your existing state declarations
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: 'Welcome to chat!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [firebaseGames, setFirebaseGames] = useState([]);
  const [showDeposit, setShowDeposit] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [cashierSection, setCashierSection] = useState('deposit');


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesRef = collection(db, 'games');
        const querySnapshot = await getDocs(gamesRef);
        const gamesData = [];
        querySnapshot.forEach((doc) => {
          gamesData.push({ id: doc.id, ...doc.data() });
        });
        setFirebaseGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handleLogin = (loginUsername) => {
    setIsLoggedIn(true);
    setUsername(loginUsername);
    setIsAdmin(loginUsername.toLowerCase() === 'admin');
    setShowAuth(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
    setMessages([{ id: 1, user: 'System', text: 'Welcome to chat!' }]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const message = {
      id: Date.now(),
      user: username,
      text: newMessage
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleDeposit = () => {
    if (depositAmount <= 0 || !selectedCrypto) {
      alert('Please select a cryptocurrency and enter a valid amount.');
      return;
    }
    // Deposit logic
    alert(`Depositing ${depositAmount} ${selectedCrypto}`);
    setShowDeposit(false);
    setSelectedCrypto('');
    setDepositAmount(0);
  };

  return (
      <>
        {/* Deposit Button Top Bar */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-4">
          <button
              onClick={() => setShowDeposit(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Deposit Crypto
          </button>
        </div>

        {/* Deposit Modal */}
        {showDeposit && (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
              <div className="rounded-xl bg-gray-900 text-white shadow-xl w-[600px] h-auto relative">

                {/* Close Button */}
                <button
                    onClick={() => setShowDeposit(false)}
                    className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
                >
                  &times;
                </button>

                {/* Header Tabs */}
                <div className="flex border-b border-gray-700">
                  {['deposit', 'withdrawal', 'tip'].map(tab => (
                      <button
                          key={tab}
                          className={`flex-1 py-3 font-semibold transition-colors ${
                              cashierSection === tab
                                  ? 'border-b-2 border-blue-500 text-white'
                                  : 'text-gray-400 hover:text-white'
                          }`}
                          onClick={() => setCashierSection(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                  ))}
                </div>

                {/* Deposit Section */}
                {cashierSection === 'deposit' && (
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Deposit Cryptocurrency</h2>
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {[
                          { short: 'BTC', name: 'Bitcoin' },
                          { short: 'USDT', name: 'Tether' },
                          { short: 'USDC', name: 'USD Coin' },
                          { short: 'ETH', name: 'Ethereum' },
                          { short: 'XRP', name: 'Ripple' },
                          { short: 'TRX', name: 'Tron' },
                          { short: 'LTC', name: 'Litecoin' },
                          { short: 'DOGE', name: 'Dogecoin' },
                        ].map(item => (
                            <button
                                key={item.short}
                                onClick={() => setSelectedCrypto(item.short)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg transition transform hover:scale-105 ${
                                    selectedCrypto === item.short
                                        ? 'bg-blue-600'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                            >
                              <span className="font-bold uppercase">{item.short}</span>
                              <span className="text-xs text-gray-400">{item.name}</span>
                            </button>
                        ))}
                      </div>

                      <input
                          type="number"
                          min="0.0001"
                          placeholder="Amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full bg-gray-800 placeholder-gray-400 p-3 rounded-lg"
                      />

                      <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                            onClick={() => setShowDeposit(false)}
                        >
                          Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                            onClick={handleDeposit}
                        >
                          Confirm Deposit
                        </button>
                      </div>
                    </div>
                )}

                {/* Withdrawal Section */}
                {cashierSection === 'withdrawal' && (
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Withdrawals</h2>
                      <p className="text-sm text-gray-400 mb-2">This feature is coming soon.</p>
                      {/* Placeholder input */}
                      <input
                          type="text"
                          placeholder="Withdrawal functionality not available yet"
                          className="w-full bg-gray-800 p-3 rounded-lg text-gray-500"
                          disabled
                      />
                    </div>
                )}

                {/* Tip Section */}
                {cashierSection === 'tip' && (
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Send a Tip</h2>
                      <p className="text-sm text-gray-400 mb-2">This feature is coming soon.</p>
                      {/* Placeholder input */}
                      <input
                          type="text"
                          placeholder="Tip functionality not available yet"
                          className="w-full bg-gray-800 p-3 rounded-lg text-gray-500"
                          disabled
                      />
                    </div>
                )}
              </div>
            </div>
        )}



        {/* Main Layout */}
        <div className={`flex min-h-screen bg-gray-900 ${showAuth ? 'blur-sm' : ''}`}>
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-800 p-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-white">GambleMaster</h1>
              {isLoggedIn && (
                  <div className="flex flex-col items-end">
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                      Logout
                    </button>
                    {isAdmin && (
                        <span className="text-xs text-blue-400">Admin Mode</span>
                    )}
                  </div>
              )}
            </div>
            <nav>
              <ul className="space-y-2">
                <li
                    className={`text-gray-300 hover:text-white cursor-pointer ${currentPage === 'home' ? 'font-bold' : ''}`}
                    onClick={() => setCurrentPage('home')}
                >
                  🏠 Home
                </li>
                <li
                    className={`text-gray-300 hover:text-white cursor-pointer ${currentPage === 'slots' ? 'font-bold' : ''}`}
                    onClick={() => setCurrentPage('slots')}
                >
                  🎰 Slots
                </li>
                <li
                    className={`text-gray-300 hover:text-white cursor-pointer ${currentPage === 'casino' ? 'font-bold' : ''}`}
                    onClick={() => setCurrentPage('casino')}
                >
                  🎲 Casino
                </li>
                <li
                    className={`text-gray-300 hover:text-white cursor-pointer ${currentPage === 'sports' ? 'font-bold' : ''}`}
                    onClick={() => setCurrentPage('sports')}
                >
                  ⚽ Sports
                </li>
                {isAdmin && (
                    <li
                        className={`text-gray-300 hover:text-white cursor-pointer ${currentPage === 'admin' ? 'font-bold' : ''} mt-8 text-blue-400`}
                        onClick={() => setCurrentPage('admin')}
                    >
                      ⚙️ Admin Panel
                    </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {currentPage === 'home' ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Featured Games</h2>
                    {isLoggedIn && <span className="text-gray-400">Welcome, {username}!</span>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {firebaseGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform"
                        >
                          <div className="w-full h-48 rounded overflow-hidden bg-gray-700">
                            <img
                                src={game.imageUrl}
                                alt={game.title}
                                className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className="text-white mt-2">{game.title}</h3>
                          <p className="text-gray-400">{game.provider}</p>
                          {game.isNew && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">NEW</span>
                          )}
                        </div>
                    ))}
                  </div>
                </>
            ) : currentPage === 'slots' ? (
                <SlotsPage />
            ) : currentPage === 'casino' ? (
                <CasinoPage />
            ) : currentPage === 'sports' ? (
                <SportsPage />
            ) : currentPage === 'admin' && isAdmin ? (
                <AdminPage />
            ) : null}
          </div>


          {/* Right Chat Panel */}
          <div className="w-64 bg-gray-800 p-4">
            <h2 className="text-xl font-bold text-white mb-4">Live Chat</h2>
            <div className="bg-gray-700 rounded p-4 h-[calc(100vh-8rem)] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col ${message.user === username ? 'items-end' : 'items-start'}`}
                    >
                      <div
                          className={`rounded-lg px-3 py-2 max-w-[90%] ${
                              message.user === username ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
                          }`}
                      >
                        <div className="text-xs font-bold">{message.user}</div>
                        <div className="text-sm">{message.text}</div>
                      </div>
                    </div>
                ))}
              </div>
              <div className="mt-4">
                {isLoggedIn ? (
                    <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                      <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full bg-gray-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                          type="submit"
                          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Send
                      </button>
                    </form>
                ) : (
                    <div className="text-center p-3 bg-gray-600 rounded">
                      <p className="text-gray-300 text-sm mb-2">Want to chat? Please log in.</p>
                      <button
                          onClick={() => setShowAuth(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Log In
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAuth && <Auth onLogin={handleLogin} />}
      </>
  );
};

export default HomePage;
