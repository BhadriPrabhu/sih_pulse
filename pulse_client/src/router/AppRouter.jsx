import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from '../context/AuthContext';
import ScrollToTop from '../components/layout/ScrollToTop';
import LandingPage from '../features/landing/LandingPage';
import ExplorePage from '../features/explore/ExplorePage';
import DataLibraryPage from '../features/data-library/DataLibraryPage';
import MediaPage from '../features/media/MediaPage';
import ExpeditionsPage from '../features/expeditions/ExpeditionsPage';
import LearnPage from '../features/learn/LearnPage';
import LoginPage from '../features/auth/LoginPage';
import MyDeskPage from '../features/my-desk/MyDeskPage';
import ComingSoonPage from '../features/error/ComingSoonPage';
import NotFoundPage from '../features/error/NotFoundPage';

export default function AppRouter() {
  const location = useLocation();
  
  return (
    <AuthProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/data-library" element={<DataLibraryPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/expeditions" element={<ExpeditionsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-desk" element={<MyDeskPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          {/* Catch-all for 404s */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}