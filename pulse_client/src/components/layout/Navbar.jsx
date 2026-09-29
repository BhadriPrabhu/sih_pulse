import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Doodle from '../ui/Doodle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-80 transition-all duration-300 ${
        scrolled ? 'bg-paper/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Doodle type="compass" className="w-5 h-5 text-terracotta group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-typewriter text-xl tracking-tight text-ink mt-1">Pulse.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-[15px] text-ink/80 font-body">
          {['Explore', 'Expeditions', 'Data library', 'Media', 'Learn'].map(link => (
            <a key={link} href="#" className="hover:text-terracotta transition-colors">{link}</a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-[15px] font-body text-ink/80 hover:text-ink hidden sm:block">Login</a>
          <button className="bg-ink text-paper px-5 py-2 rounded-full font-body font-medium text-[14px] hover:bg-teal-ink transition-colors">
            Start exploring
          </button>
        </div>
      </div>
    </motion.nav>
  );
}