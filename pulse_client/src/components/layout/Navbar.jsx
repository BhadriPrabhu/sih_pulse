import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Doodle from '../ui/Doodle';
import PillButton from '../ui/PillButton';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { path: '/explore', label: 'Explore' },
  { path: '/expeditions', label: 'Expeditions' },
  { path: '/data-library', label: 'Data library' },
  { path: '/media', label: 'Media' },
  { path: '/learn', label: 'Learn' }
];

const ROTATIONS = [-1, 1.2, -0.5, 0.8, -1.5];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const menuRef = useRef(null);
  
  const { user, logout } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'User';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
      window.addEventListener('keydown', handleEsc);
      if (menuRef.current) menuRef.current.focus();
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled && !isMenuOpen ? 'bg-paper/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group relative z-[60]">
            <Doodle type="compass" className="w-5 h-5 text-terracotta group-hover:rotate-45 transition-transform duration-500" />
            <span className="font-typewriter text-xl tracking-tight text-ink mt-1">Pulse.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] text-ink/80 font-body">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link key={link.path} to={link.path} className="relative py-1 hover:text-ink transition-colors group">
                  <span className={isActive ? 'text-ink font-medium' : ''}>{link.label}</span>
                  {isActive && (
                    <motion.svg layoutId="navbar-underline" className="absolute -bottom-1 left-0 w-full h-1.5 text-terracotta/70" viewBox="0 0 100 10" preserveAspectRatio="none">
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

          <div className="flex items-center gap-6 relative z-[60]">
            {user ? (
              <div className="relative group hidden md:block">
                <button className="text-[15px] font-body text-ink/80 hover:text-ink flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm py-1">
                  {firstName}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L5 5L9 1"/></svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-[#FBF9F4] border border-ink/5 shadow-paper-soft rounded-md flex flex-col py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/my-desk" className="px-4 py-2 font-body text-sm text-ink/70 hover:text-terracotta hover:bg-ink/5">My desk</Link>
                  <button onClick={handleLogout} className="px-4 py-2 font-body text-sm text-ink/70 hover:text-terracotta hover:bg-ink/5 text-left w-full">Log out</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-[15px] font-body text-ink/80 hover:text-ink hidden md:block">Login</Link>
            )}
            
            <Link to="/explore" className="hidden md:block">
              <PillButton className="whitespace-nowrap">Start exploring</PillButton>
            </Link>

            <button
              className="md:hidden text-ink p-2 -mr-2 cursor-pointer outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path initial="closed" variants={{ closed: { d: "M3 6 Q12 5 21 7" }, open: { d: "M5 5 Q12 12 19 19" } }} animate={isMenuOpen ? "open" : "closed"} transition={{ duration: 0.3 }} />
                <motion.path initial="closed" variants={{ closed: { d: "M4 12 Q12 13 20 11", opacity: 1 }, open: { d: "M12 12 Q12 12 12 12", opacity: 0 } }} animate={isMenuOpen ? "open" : "closed"} transition={{ duration: 0.3 }} />
                <motion.path initial="closed" variants={{ closed: { d: "M3 18 Q12 17 21 19" }, open: { d: "M5 19 Q12 12 19 5" } }} animate={isMenuOpen ? "open" : "closed"} transition={{ duration: 0.3 }} />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-ink/30 z-[45] md:hidden" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
            <motion.div
              ref={menuRef} tabIndex={-1}
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }} animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }} exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }} transition={{ type: 'spring', stiffness: 75, damping: 20 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-paper z-50 md:hidden flex flex-col shadow-[-15px_0_40px_rgba(27,26,23,0.1)] outline-none"
              style={{ WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5,0 L100,0 L100,100 L5,100 L3,95 L6,90 L4,85 L5,80 L3,75 L6,70 L4,65 L5,60 L3,55 L6,50 L4,45 L5,40 L3,35 L6,30 L4,25 L5,20 L3,15 L6,10 L4,5 L5,0 Z' fill='black'/%3E%3C/svg%3E")`, maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5,0 L100,0 L100,100 L5,100 L3,95 L6,90 L4,85 L5,80 L3,75 L6,70 L4,65 L5,60 L3,55 L6,50 L4,45 L5,40 L3,35 L6,30 L4,25 L5,20 L3,15 L6,10 L4,5 L5,0 Z' fill='black'/%3E%3C/svg%3E")`, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}
              role="dialog" aria-modal="true"
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply z-0">
                <svg width="100%" height="100%"><filter id="menu-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#menu-grain)" /></svg>
              </div>

              <motion.div className="flex-grow flex flex-col justify-center px-10 relative z-10 gap-8 pt-16" variants={containerVariants} initial="closed" animate="open" exit="closed">
                {NAV_LINKS.map((link, i) => {
                  const isActive = location.pathname.startsWith(link.path);
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link to={link.path} className="inline-block relative group" style={{ transform: `rotate(${ROTATIONS[i]}deg)` }}>
                        <span className="font-grotesque text-[2.25rem] leading-none text-ink tracking-tight">{link.label}</span>
                        {isActive && <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-terracotta/80" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div className="p-10 flex flex-col items-start gap-8 relative z-10 border-t border-ink/10 border-dashed mx-6 mb-4" variants={itemVariants} initial="closed" animate="open" exit="closed">
                {user ? (
                  <>
                    <Link to="/my-desk" className="font-body text-lg text-ink/70 hover:text-ink font-medium">My desk</Link>
                    <button onClick={handleLogout} className="font-body text-lg text-ink/70 hover:text-terracotta text-left">Log out</button>
                  </>
                ) : (
                  <Link to="/login" className="font-body text-lg text-ink/70 hover:text-ink">Log in to account</Link>
                )}
                <div className="flex items-end justify-between w-full mt-4">
                  <Link to="/explore"><PillButton className="whitespace-nowrap px-8 py-3">Start exploring</PillButton></Link>
                  <Doodle type="penguin" className="w-10 h-10 text-ink/30 origin-bottom transform rotate-12" stroke="currentColor" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}