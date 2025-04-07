// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import SportsPage from './pages/SportsPage';
import BattlesPage from './pages/BattlesPage';
import PacksPage from './pages/PacksPage';
import CryptoPage from './pages/CryptoPage';
import ProfilePage from './pages/ProfilePage';
import PromotionsPage from './pages/PromotionsPage';
import AdminPage from './pages/admin/AdminPage';
import SlotsPage from './pages/SlotsPage';
import LiveCasinoPage from './pages/LiveCasinoPage';
import TableGamesPage from './pages/TableGamesPage';
import FootballPage from './pages/sports/FootballPage';
import BasketballPage from './pages/sports/BasketballPage';
import ESportsPage from './pages/sports/ESportsPage';
import PackStorePage from './pages/packs/PackStorePage';
import PackOpenPage from './pages/packs/PackOpenPage';
import PackInventoryPage from './pages/packs/PackInventoryPage';
import PackHistoryPage from './pages/packs/PackHistoryPage';
import ProfileStatsPage from './pages/profile/ProfileStatsPage';
import ProfileRankPage from './pages/profile/ProfileRankPage';
import ProfileSettingsPage from './pages/profile/ProfileSettingsPage';
import WalletPage from './pages/crypto/WalletPage';
import ConversionPage from './pages/ConversionPage';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/conversion" />;
    }
    
    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/" />;
    }
    
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/conversion" element={<ConversionPage />} />
            <Route path="/games" element={
                <ProtectedRoute>
                    <Layout><GamesPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/slots" element={<Layout><SlotsPage /></Layout>} />
            <Route path="/live-casino" element={<Layout><LiveCasinoPage /></Layout>} />
            <Route path="/table-games" element={<Layout><TableGamesPage /></Layout>} />
            <Route path="/sports" element={<Layout><SportsPage /></Layout>} />
            <Route path="/sports/football" element={<Layout><FootballPage /></Layout>} />
            <Route path="/sports/basketball" element={<Layout><BasketballPage /></Layout>} />
            <Route path="/sports/esports" element={
                <ProtectedRoute>
                    <Layout><ESportsPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/battles" element={<Layout><BattlesPage /></Layout>} />
            <Route path="/battles/history" element={<Layout><BattlesPage /></Layout>} />
            <Route path="/battles/create" element={<Layout><BattlesPage /></Layout>} />
            <Route path="/packs" element={
                <ProtectedRoute>
                    <Layout><PacksPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/packs/store" element={<Layout><PackStorePage /></Layout>} />
            <Route path="/open-pack/:packId" element={<Layout><PackOpenPage /></Layout>} />
            <Route path="/packs/inventory" element={
                <ProtectedRoute>
                    <Layout><PackInventoryPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/packs/history" element={<Layout><PackHistoryPage /></Layout>} />
            <Route path="/crypto" element={<Layout><CryptoPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/profile/stats" element={<Layout><ProfileStatsPage /></Layout>} />
            <Route path="/profile/rank" element={<Layout><ProfileRankPage /></Layout>} />
            <Route path="/profile/settings" element={<Layout><ProfileSettingsPage /></Layout>} />
            <Route path="/promotions" element={<Layout><PromotionsPage /></Layout>} />
            <Route path="/wallet" element={
                <ProtectedRoute>
                    <Layout><WalletPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                    <Layout><AdminPage /></Layout>
                </ProtectedRoute>
            } />
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;