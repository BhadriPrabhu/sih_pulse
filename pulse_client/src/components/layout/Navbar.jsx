import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Doodle from '../ui/Doodle';

const NAV_LINKS = [
  { path: '/explore', label: 'Explore' },
  { path: '/expeditions', label: 'Expeditions' },
  { path: '/data-library', label: 'Data library' },
  { path: '/media', label: 'Media' },
  { path: '/learn', label: 'Learn' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Doodle type="compass" className="w-5 h-5 text-terracotta group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-typewriter text-xl tracking-tight text-ink mt-1">Pulse.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-[15px] text-ink/80 font-body">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link key={link.path} to={link.path} className="relative py-1 hover:text-ink transition-colors group">
                <span className={isActive ? 'text-ink' : ''}>{link.label}</span>
                {isActive && (
                  <motion.svg 
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 w-full h-1.5 text-terracotta/70" 
                    viewBox="0 0 100 10" 
                    preserveAspectRatio="none"
                  >
                    <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.svg>
                )}
                {!isActive && (
                  <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-teal-ink/20 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-[15px] font-body text-ink/80 hover:text-ink hidden sm:block">Login</Link>
          <Link to="/explore" className="bg-ink text-paper px-5 py-2 rounded-full font-body font-medium text-[14px] hover:bg-teal-ink transition-colors">
            Start exploring
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}