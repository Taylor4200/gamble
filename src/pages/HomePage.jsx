// ...all your existing imports
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import SlotsPage from './SlotsPage';
import SportsPage from './SportsPage';
import GameCard from '../components/GameCard';

const HomePage = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [firebaseGames, setFirebaseGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesRef = collection(db, 'games');
        const querySnapshot = await getDocs(gamesRef);
        const gamesData = [];
        querySnapshot.forEach((doc) => {
          gamesData.push({ id: doc.id, ...doc.data() });
        });
        // Only use games from Firebase that are marked for HOME
        const homeGames = gamesData.filter(game => game.categories?.includes('HOME'));
        setFirebaseGames(homeGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="p-8">
      {currentPage === 'home' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Games</h2>
            {user && <span className="text-gray-400">Welcome, {user.username}!</span>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {firebaseGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </>
      ) : currentPage === 'slots' ? (
        <SlotsPage />
      ) : currentPage === 'sports' ? (
        <SportsPage />
      ) : null}
    </div>
  );
};

export default HomePage;
