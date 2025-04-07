import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, addDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PackOpeningAnimation from '../../components/PackOpeningAnimation';

const PackStorePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOpenings, setRecentOpenings] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [serverSeed, setServerSeed] = useState(null);
  const [clientSeed, setClientSeed] = useState(null);
  const [nonce, setNonce] = useState(null);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([fetchPacks(), fetchRecentOpenings()]);
      } catch (err) {
        setError('Failed to load packs. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0.00';
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
    }
    return '0.00';
  };

  const fetchPacks = async () => {
    try {
      console.log('Fetching packs from Firestore...');
      const packsRef = collection(db, 'packs');
      const q = query(packsRef, orderBy('price', 'asc'));
      const querySnapshot = await getDocs(q);
      console.log('Query snapshot:', querySnapshot);
      const packsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Packs data:', packsData);

      setPacks(packsData);
    } catch (error) {
      console.error('Error fetching packs:', error);
      throw error;
    }
  };

  const formatBalance = (balance) => {
    if (balance === undefined || balance === null) return '0.00';
    
    // Handle cryptocurrency object format
    if (typeof balance === 'object' && balance !== null) {
      // If it has USDT, use that as the primary currency
      if (balance.usdt !== undefined) {
        return typeof balance.usdt === 'number' ? balance.usdt.toFixed(2) : '0.00';
      }
      // If not, return a fallback value
      return '0.00';
    }
    
    return typeof balance === 'number' ? balance.toFixed(2) : '0.00';
  };

  const fetchRecentOpenings = async () => {
    try {
      const openingsRef = collection(db, 'pack_openings');
      const q = query(openingsRef, orderBy('timestamp', 'desc'), where('isPublic', '==', true));
      const querySnapshot = await getDocs(q);
      const openingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).slice(0, 5);
      setRecentOpenings(openingsData);
    } catch (error) {
      console.error('Error fetching recent openings:', error);
    }
  };

  const handleOpenPack = async (pack) => {
    if (!user) {
      setError('Please log in to open packs');
      return;
    }

    try {
      setIsOpening(true);
      setError(null);
      setResult(null);

      // Generate seeds
      const newServerSeed = crypto.randomUUID();
      const newClientSeed = crypto.randomUUID();
      const newNonce = Date.now();

      setServerSeed(newServerSeed);
      setClientSeed(newClientSeed);
      setNonce(newNonce);
      setSelectedPack(pack);
    } catch (err) {
      console.error('Error opening pack:', err);
      setError('Failed to open pack. Please try again.');
      setIsOpening(false);
    }
  };

  const getPackColor = (rarity) => {
    switch(rarity?.toLowerCase()) {
      case 'common': return 'from-gray-600 to-gray-700';
      case 'rare': return 'from-blue-600 to-blue-700';
      case 'epic': return 'from-purple-600 to-purple-700';
      case 'legendary': return 'from-yellow-600 to-yellow-700';
      case 'mythical': return 'from-red-600 to-red-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const handlePackClick = (packId) => {
    navigate(`/open-pack/${packId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Pack Store</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Balance:</span>
          <span className="text-xl font-bold text-green-400">${formatBalance(user?.balance)}</span>
        </div>
      </div>

      {packs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No packs available</h2>
          <p className="text-gray-400">Check back later for new packs!</p>
        </div>
      ) : (
        <>
          {/* Featured Pack - Show most expensive pack as featured */}
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-8 cursor-pointer hover:opacity-90 transition"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-3xl font-bold mb-2">🌟 Featured Pack!</h2>
                <p className="text-lg mb-4">{packs[packs.length - 1].description}</p>
                <button 
                  onClick={() => handleOpenPack(packs[packs.length - 1])}
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Open Now - ${formatPrice(packs[packs.length - 1].price)}
                </button>
              </div>
              <div className="text-8xl">{packs[packs.length - 1].image || '👑'}</div>
            </div>
          </div>

          {/* Pack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => (
              <div 
                key={pack.id}
                className={`bg-gradient-to-br ${getPackColor(pack.rarity)} rounded-lg p-6 flex flex-col cursor-pointer hover:opacity-90 transition`}
                onClick={() => handlePackClick(pack.id)}
              >
                <div className="text-4xl mb-4 self-center">{pack.image || '🎁'}</div>
                <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
                <p className="text-sm mb-4 flex-grow">{pack.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span className="font-bold">{Array.isArray(pack.items) ? pack.items.length : 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min Value:</span>
                    <span className="font-bold">${formatPrice(pack.minValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Value:</span>
                    <span className="font-bold">${formatPrice(pack.maxValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rarity:</span>
                    <span className="font-bold capitalize">{pack.rarity || 'Common'}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenPack(pack)}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 rounded-lg font-semibold transition text-center"
                >
                  Open for ${formatPrice(pack.price)}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Recent Openings */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Openings</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          {recentOpenings.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No recent openings to display</p>
          ) : (
            <div className="space-y-4">
              {recentOpenings.map((opening) => (
                <div key={opening.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{opening.item?.image || '🎁'}</span>
                    <div>
                      <p className="font-medium">{opening.packName}</p>
                      <p className="text-sm text-gray-400">Opened by {opening.username}</p>
                    </div>
                  </div>
                  <div className={`font-bold ${opening.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {opening.profit >= 0 ? '+' : ''}${formatPrice(opening.profit)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpening && selectedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Opening {selectedPack.name}</h2>
            <PackOpeningAnimation
              pack={selectedPack}
              serverSeed={serverSeed}
              clientSeed={clientSeed}
              nonce={nonce}
              onComplete={(winningItem) => {
                setResult(winningItem);
                setIsOpening(false);
              }}
            />
          </div>
        </div>
      )}

      {result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">You Won!</h2>
            <div className="text-center">
              <div className="text-6xl mb-4">{result.image || '🎁'}</div>
              <div className="text-xl font-semibold">{result.name}</div>
              <div className="text-green-400 text-lg">${formatPrice(result.value)}</div>
              <button
                onClick={() => setResult(null)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackStorePage; 