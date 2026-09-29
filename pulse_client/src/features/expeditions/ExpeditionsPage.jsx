import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';
import { expeditionsData } from '../../data/expeditionsData';
import { useSavedItems } from '../../hooks/useSavedItems';

const FILTERS = ["All", "Antarctica", "Arctic", "Stations", "Campaigns"];

export default function ExpeditionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeEntryId, setActiveEntryId] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  
  const entryRefs = useRef({});
  const { savedItems, toggleItem } = useSavedItems('pulse_saved_expeditions');
  const { savedItems: followedCampaigns, toggleItem: toggleCampaign } = useSavedItems('pulse_followed_campaigns');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const filteredData = useMemo(() => {
    return expeditionsData.filter(item => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Antarctica") return item.region === "Antarctica";
      if (activeFilter === "Arctic") return item.region === "Arctic";
      if (activeFilter === "Stations") return item.type === "Stations";
      if (activeFilter === "Campaigns") return item.type === "Campaigns";
      return true;
    });
  }, [activeFilter]);

  // Handle deep linking from URL Hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (expeditionsData.some(e => e.id === id)) {
        setActiveEntryId(id);
        setTimeout(() => {
          entryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    } else {
      setActiveEntryId(null);
    }
  }, [location.hash]);

  const openSheet = (id) => {
    navigate(`/expeditions#${id}`);
  };

  const closeSheet = () => {
    navigate('/expeditions', { replace: true });
  };

  // Keyboard Navigation for Sheet
  useEffect(() => {
    if (!activeEntryId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSheet();
      
      const currentIndex = filteredData.findIndex(item => item.id === activeEntryId);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex < filteredData.length - 1) openSheet(filteredData[currentIndex + 1].id);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex > 0) openSheet(filteredData[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeEntryId, filteredData, navigate]);

  const activeEntry = useMemo(() => expeditionsData.find(e => e.id === activeEntryId), [activeEntryId]);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/expeditions#${activeEntryId}`);
    showToast("Link copied to clipboard");
  };

  const handleFollow = () => {
    toggleCampaign(activeEntryId);
    showToast(followedCampaigns.includes(activeEntryId) ? "Campaign unfollowed" : "You'll see updates on your desk");
  };

  return (
    <PageShell title="Expedition logs" terracottaWord="logs" subtitle="Tracing decades of polar exploration through the official field notebooks." heroCrop="left 70%">
      

      <div className="max-w-5xl mx-auto px-6 pb-32 w-full mt-12 relative">
        
        {/* Horizontal scrollable filters for mobile */}
        <div className="flex items-center gap-6 md:gap-10 mb-20 overflow-x-auto pb-4 scrollbar-hide md:justify-center px-4 snap-x">
          {FILTERS.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className="relative py-2 font-body text-[15px] hover:text-ink transition-colors group outline-none snap-start whitespace-nowrap shrink-0"
            >
              <span className={activeFilter === tab ? 'text-ink font-medium' : 'text-ink/60'}>
                {tab}
              </span>
              {activeFilter === tab && (
                <motion.svg layoutId="expedition-filter-underline" className="absolute -bottom-1 left-0 w-full h-1.5 text-terracotta/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </motion.svg>
              )}
              {activeFilter !== tab && (
                <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Timeline Path */}
        <div className="relative w-full">
          {/* Continuous hand-drawn line connecting entries */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 border-l-2 border-ink/15 border-dashed -translate-x-1/2 z-0" />

          <div className="flex flex-col gap-12">
            <AnimatePresence initial={false}>
              {filteredData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isLatest = item.id === 'latest-campaign';
                
                return (
                  <motion.div
                    key={item.id}
                    ref={el => entryRefs.current[item.id] = el}
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className={`relative w-full flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* The timeline node marker */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-paper border-2 border-terracotta -translate-x-1/2 mt-6 z-10" />

                    {/* Content Box */}
                    <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-24 text-left' : 'md:pl-12 lg:pl-24 text-left'} py-2`}>
                      <button 
                        onClick={() => openSheet(item.id)}
                        className={`w-full text-left p-6 md:p-8 outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg transition-colors border border-transparent ${activeEntryId === item.id ? 'bg-[#FBF9F4] border-ink/10 shadow-paper-soft' : 'hover:bg-paper-lighter group cursor-pointer'}`}
                      >
                        <span onClick={(e) => { e.stopPropagation(); openSheet(item.id); }} className="inline-block font-typewriter text-xs text-ink/50 bg-[#F4F1E9] px-2 py-1 transform -rotate-2 mb-4 hover:text-terracotta hover:scale-105 transition-transform cursor-pointer shadow-sm border border-ink/5">
                          {item.year} // {item.region}
                        </span>
                        
                        <h3 className="font-grotesque text-2xl text-ink mb-2 group-hover:text-terracotta transition-colors">{item.title}</h3>
                        <p className="font-body text-sm text-ink/60 mb-6">{item.location}</p>
                        
                        <div className="font-hand text-lg text-teal-ink border-b border-teal-ink/20 pb-1 w-fit group-hover:border-teal-ink transition-colors">
                          {item.actionLabel} →
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Slide-over / Bottom Sheet Modal */}
      <AnimatePresence>
        {activeEntry && (
          <>
            {/* Dimmed Overlay (No blur as requested) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={closeSheet} 
              className="fixed inset-0 bg-ink/30 z-[60]" 
            />
            
            <motion.div 
              initial={{ x: '100%', y: 0 }} 
              animate={{ x: 0, y: 0 }} 
              exit={{ x: '100%', y: 0 }} 
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="fixed top-0 right-0 w-full md:w-[540px] h-[85vh] md:h-full top-auto bottom-0 md:top-0 bg-[#FBF9F4] z-[70] shadow-2xl p-6 md:p-12 overflow-y-auto rounded-t-3xl md:rounded-none"
              // Desktop torn edge
              style={{
                '@media (minWidth: 768px)': {
                  borderLeft: '1px solid rgba(27,26,23,0.1)',
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5,0 L100,0 L100,100 L5,100 L3,95 L6,90 L4,85 L5,80 L3,75 L6,70 L4,65 L5,60 L3,55 L6,50 L4,45 L5,40 L3,35 L6,30 L4,25 L5,20 L3,15 L6,10 L4,5 L5,0 Z' fill='black'/%3E%3C/svg%3E")`,
                  maskSize: "100% 100%"
                }
              }}
            >
              {/* Controls */}
              <div className="flex items-center justify-between mb-10 pt-4 md:pt-0">
                <div className="flex gap-4">
                  <button onClick={() => {
                    const idx = filteredData.findIndex(e => e.id === activeEntry.id);
                    if (idx > 0) openSheet(filteredData[idx - 1].id);
                  }} disabled={filteredData.findIndex(e => e.id === activeEntry.id) === 0} className="text-ink/40 hover:text-ink disabled:opacity-30">
                    ← Prev
                  </button>
                  <button onClick={() => {
                    const idx = filteredData.findIndex(e => e.id === activeEntry.id);
                    if (idx < filteredData.length - 1) openSheet(filteredData[idx + 1].id);
                  }} disabled={filteredData.findIndex(e => e.id === activeEntry.id) === filteredData.length - 1} className="text-ink/40 hover:text-ink disabled:opacity-30">
                    Next →
                  </button>
                </div>
                <button onClick={closeSheet} className="font-typewriter text-ink/60 hover:text-terracotta outline-none">[x] close</button>
              </div>

              {/* Header */}
              <div className="inline-block bg-white border border-ink/10 px-3 py-1 font-typewriter text-xs text-ink/60 mb-6 shadow-sm transform -rotate-1">
                Field Note // {activeEntry.year}
              </div>
              <h2 className="font-grotesque text-3xl md:text-4xl text-ink mb-2">{activeEntry.title}</h2>
              <p className="font-typewriter text-sm text-terracotta mb-8 border-b border-ink/10 pb-4 border-dashed">{activeEntry.location}</p>

              {/* Story (3-4 paras) */}
              <div className="font-body text-ink/80 text-[15px] leading-relaxed space-y-4 mb-10">
                {activeEntry.story.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Key Facts */}
              <div className="bg-paper p-6 border border-ink/5 mb-10 wobble-edge">
                <h4 className="font-typewriter text-ink font-bold mb-4 text-sm">Key facts</h4>
                <ul className="space-y-2">
                  {activeEntry.keyFacts.map((fact, i) => (
                    <li key={i} className="font-body text-sm text-ink/70 flex items-start gap-2">
                       <span className="text-terracotta mt-1 text-xs">◆</span> {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini Timeline */}
              <h4 className="font-typewriter text-ink font-bold mb-4 text-sm mt-8 border-b border-ink/10 pb-2 border-dashed">Timeline</h4>
              <div className="relative pl-4 mb-12 border-l border-ink/10 space-y-6">
                {activeEntry.timeline.map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-ink/20" />
                    <p className="font-typewriter text-xs text-ink/50 mb-0.5">{event.date}</p>
                    <p className="font-body text-sm text-ink/90">{event.event}</p>
                  </div>
                ))}
              </div>

              {/* Actions & Related */}
              <div className="flex flex-col gap-6 pt-6 border-t border-ink/10">
                
                {activeEntry.id === 'latest-campaign' ? (
                  <button onClick={handleFollow} className="w-full flex items-center justify-center gap-2 bg-ink text-paper font-typewriter py-3 rounded-sm hover:bg-terracotta transition-colors shadow-sm">
                    {followedCampaigns.includes(activeEntry.id) ? "Following Campaign" : "Follow this campaign"}
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={() => { toggleItem(activeEntry.id); showToast(savedItems.includes(activeEntry.id) ? "Removed from desk" : "Saved to My desk"); }} className="flex-1 flex items-center justify-center gap-2 border border-ink/20 bg-white font-typewriter text-sm py-2 text-ink hover:text-terracotta hover:border-terracotta/50 transition-colors shadow-sm">
                      <Doodle type="bookmark" className="w-3 h-3" fill={savedItems.includes(activeEntry.id) ? "currentColor" : "none"} />
                      {savedItems.includes(activeEntry.id) ? "Saved" : "Save to desk"}
                    </button>
                    <button onClick={handleCopyLink} className="flex-1 flex items-center justify-center gap-2 border border-ink/20 bg-white font-typewriter text-sm py-2 text-ink hover:text-teal-ink hover:border-teal-ink/50 transition-colors shadow-sm">
                      Copy link
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Link to={`/data-library?q=${encodeURIComponent(activeEntry.relatedDatasets)}`} className="font-body text-sm text-teal-ink hover:text-terracotta underline decoration-teal-ink/30 underline-offset-4">
                    View related datasets →
                  </Link>
                  <Link to={`/media?q=${encodeURIComponent(activeEntry.relatedMedia)}`} className="font-body text-sm text-teal-ink hover:text-terracotta underline decoration-teal-ink/30 underline-offset-4">
                    Browse media gallery →
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Paper Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-[#FBF9F4] border border-ink/10 shadow-paper-lift px-6 py-3 rounded-md flex items-center gap-3 transform rotate-[-1deg]"
          >
            <span className="font-typewriter text-sm text-ink">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </PageShell>
  );
}