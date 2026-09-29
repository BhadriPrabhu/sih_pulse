import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';
import { mediaData } from '../../data/mediaData';
import { useDebounce } from '../../hooks/useDebounce';
import { useSavedItems } from '../../hooks/useSavedItems';

const TABS = ["All", "Photos", "Videos", "Aurora", "Wildlife", "Life at station"];

// Helper to render the flat SVG placeholder scenes based on type
function SceneGraphic({ scene }) {
  switch (scene) {
    case 'aurora':
      return (
        <div className="w-full h-full bg-teal-ink relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/4 left-0 w-full h-1/2 bg-sage/80 transform -rotate-12 rounded-[100%]" />
          <div className="absolute top-1/3 left-10 w-3/4 h-1/3 bg-glacier/60 transform rotate-6 rounded-[100%]" />
          <div className="absolute top-4 left-4 w-0.5 h-0.5 bg-paper rounded-full opacity-60" />
          <div className="absolute top-12 right-8 w-1 h-1 bg-paper rounded-full opacity-40" />
          <div className="absolute bottom-1/4 left-1/2 w-0.5 h-0.5 bg-paper rounded-full opacity-80" />
        </div>
      );
    case 'penguin':
      return (
        <div className="w-full h-full bg-[#E5DCC5] relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-1/3 bg-paper" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-end gap-2">
            <div className="w-4 h-8 bg-ink rounded-t-full rounded-b-sm" />
            <div className="w-3 h-6 bg-ink rounded-t-full rounded-b-sm" />
          </div>
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-mustard/30" />
        </div>
      );
    case 'ship':
      return (
        <div className="w-full h-full bg-glacier/30 relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-2/5 bg-teal-ink" />
          <div className="absolute bottom-2/5 left-1/4 w-1/2 h-1/4 bg-terracotta relative">
             <div className="absolute -top-1/2 left-1/4 w-1/4 h-1/2 bg-paper" />
             <div className="absolute -top-1/3 right-1/4 w-1/12 h-1/3 bg-ink" />
          </div>
          <div className="absolute bottom-4 right-4 w-8 h-4 bg-paper rounded-sm transform rotate-6" />
          <div className="absolute bottom-2 left-6 w-12 h-6 bg-paper rounded-sm transform -rotate-3" />
        </div>
      );
    case 'tent':
      return (
        <div className="w-full h-full bg-[#1e2a33] relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-1/3 bg-paper" />
          <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 bg-sage rounded-t-lg" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="absolute top-6 left-6 w-1 h-1 bg-white rounded-full opacity-60" />
        </div>
      );
    case 'iceberg':
      return (
        <div className="w-full h-full bg-paper relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-2/5 bg-[#2b4c57]" />
          <div className="absolute bottom-1/3 left-1/4 w-1/2 h-1/2 bg-white" style={{ clipPath: 'polygon(30% 0%, 70% 20%, 100% 100%, 0% 100%)' }} />
        </div>
      );
    case 'station':
      return (
        <div className="w-full h-full bg-[#D1DFDF] relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-1/4 bg-ink/10" />
          <div className="absolute bottom-1/5 left-1/4 w-1/2 h-1/4 border-b-4 border-l-2 border-r-2 border-ink">
            <div className="w-full h-full bg-terracotta relative -top-2" />
          </div>
        </div>
      );
    case 'glacier':
    default:
      return (
        <div className="w-full h-full bg-[#D1DFDF] relative overflow-hidden">
          <svg className="absolute bottom-0 w-[150%] h-3/4 text-paper-deep drop-shadow-sm left-[-10%]" viewBox="0 0 100 50" preserveAspectRatio="none">
             <path d="M0 50L20 10L40 35L60 5L80 25L100 15V50Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 w-full h-1/2 text-paper drop-shadow-sm" viewBox="0 0 100 50" preserveAspectRatio="none">
             <path d="M0 50L30 20L50 40L80 15L100 30V50Z" fill="currentColor" />
          </svg>
        </div>
      );
  }
}

// Fake Video Player Component
function FakeVideoPlayer({ scene }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setPlaying(false); return 100; }
          return p + 0.5; // Simulate progress
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full h-full relative flex flex-col bg-paper border border-ink/5">
      <div className="flex-grow relative overflow-hidden cursor-pointer" onClick={() => setPlaying(!playing)}>
        <SceneGraphic scene={scene} />
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute inset-0 flex items-center justify-center bg-ink/30">
              <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center bg-ink/40">
                <Doodle type="play" className="w-6 h-6 text-white ml-1" fill="currentColor" stroke="currentColor"/>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Paper Control Bar */}
      <div className="h-12 bg-paper-lighter flex items-center gap-4 px-4 border-t border-ink/5">
        <button onClick={() => setPlaying(!playing)} className="text-ink hover:text-terracotta outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm">
          {playing ? <span className="font-typewriter font-bold text-sm tracking-tighter">||</span> : <Doodle type="play" className="w-4 h-4" fill="currentColor" />}
        </button>
        <div className="flex-grow h-1.5 bg-ink/10 relative rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-terracotta transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-typewriter text-[10px] text-ink/60 min-w-[30px]">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  
  const { savedItems, toggleItem } = useSavedItems('pulse_saved_media');

  const handleToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const filteredMedia = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return mediaData.filter(m => {
      const matchesTab = activeTab === "All" ? true : 
                         activeTab === "Photos" ? m.type === "Photo" :
                         activeTab === "Videos" ? m.type === "Video" :
                         m.category === activeTab;
      
      const matchesSearch = !q || m.caption.toLowerCase().includes(q) || m.credit.toLowerCase().includes(q);
      
      return matchesTab && matchesSearch;
    });
  }, [activeTab, debouncedSearch]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % filteredMedia.length);
  }, [filteredMedia.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  }, [filteredMedia.length]);

  const handleClose = () => setSelectedIndex(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handleNext, handlePrev]);

  // Framer Motion Drag handling for swipe
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <PageShell 
      title="Media library" 
      terracottaWord="library"
      subtitle="Raw footage, timelapses, and expedition photography from the field."
      heroCrop="60% 80%" 
    >
      <div className="max-w-7xl mx-auto px-6 pb-32 w-full mt-4">
        
        {/* Controls: Search and Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {TABS.map(tab => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedIndex(null); }}
                className="relative py-2 font-body text-[15px] hover:text-ink transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
              >
                <span className={activeTab === tab ? 'text-ink font-medium' : 'text-ink/60'}>
                  {tab}
                </span>
                {activeTab === tab && (
                  <motion.svg layoutId="media-filter-underline" className="absolute -bottom-1 left-0 w-full h-1.5 text-terracotta/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.svg>
                )}
                {activeTab !== tab && (
                  <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search media..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-typewriter border-b-2 border-ink/10 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors"
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredMedia.length === 0 ? (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="col-span-full flex flex-col items-center justify-center py-20 text-center break-inside-avoid">
                <p className="font-typewriter text-lg text-ink/50 mb-2">No photos or videos match this search.</p>
                <p className="font-hand text-xl text-ink/40">clear the search or try a different tab</p>
              </motion.div>
            ) : (
              filteredMedia.map((item, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  key={item.id}
                  className="break-inside-avoid"
                >
                  <button 
                    onClick={() => setSelectedIndex(i)}
                    style={{ transform: `rotate(${item.rotation}deg)` }}
                    className="w-full text-left bg-white p-3 pb-12 shadow-paper-soft hover:shadow-paper-lift transition-shadow border border-ink/5 cursor-pointer relative group outline-none focus-visible:ring-4 focus-visible:ring-terracotta/40"
                  >
                    <div className={`w-full ${item.heightClass} border border-ink/5 relative`}>
                      <SceneGraphic scene={item.scene} />
                      {item.type === "Video" && (
                        <div className="absolute inset-0 bg-ink/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-ink/30">
                             <Doodle type="play" className="w-6 h-6 text-white ml-1" stroke="currentColor" fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="font-typewriter text-xs text-ink/70 mt-4 px-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedIndex !== null && filteredMedia[selectedIndex] && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/40 flex items-center justify-center p-4 md:p-12"
              onClick={handleClose}
            >
              {/* Navigation Arrows (Desktop) */}
              <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 text-paper hover:text-terracotta transition-colors z-[70] p-4">
                 <Doodle type="arrow" className="w-8 h-8 transform rotate-180" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 text-paper hover:text-terracotta transition-colors z-[70] p-4">
                 <Doodle type="arrow" className="w-8 h-8" />
              </button>

              <motion.div 
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) handleNext();
                  else if (swipe > swipeConfidenceThreshold) handlePrev();
                }}
                initial={{ y: 20, rotate: -2 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 20, rotate: 2 }} transition={{ type: "spring", stiffness: 90, damping: 20 }}
                className="bg-white p-4 md:p-6 pb-20 md:pb-24 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative border border-ink/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleClose} className="absolute top-4 right-4 md:-right-12 md:-top-12 text-ink md:text-paper font-typewriter text-xl hover:opacity-70 transition-opacity">
                  [x] close
                </button>
                
                <div className="flex-grow w-full bg-paper-deep border border-ink/5 relative overflow-hidden pointer-events-auto">
                   {filteredMedia[selectedIndex].type === "Video" ? (
                     <FakeVideoPlayer scene={filteredMedia[selectedIndex].scene} />
                   ) : (
                     <SceneGraphic scene={filteredMedia[selectedIndex].scene} />
                   )}
                </div>

                {/* Back of photo metadata & actions */}
                <div className="absolute bottom-6 left-6 md:left-8 right-6 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-t border-ink/10 pt-4 mt-4 border-dashed">
                  <div className="flex flex-col">
                    <p className="font-typewriter text-sm md:text-base text-ink">
                      {filteredMedia[selectedIndex].caption}
                    </p>
                    <p className="font-typewriter text-[10px] text-ink/50 lowercase tracking-normal mt-1">
                      id: {filteredMedia[selectedIndex].id} // credit: {filteredMedia[selectedIndex].credit}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 sm:mt-0 font-body text-sm font-medium">
                    <button 
                      onClick={() => { 
                        navigator.clipboard.writeText(`https://pulse.edu/media/${filteredMedia[selectedIndex].id}`);
                        handleToast("Link copied to clipboard");
                      }} 
                      className="text-teal-ink hover:text-terracotta underline decoration-teal-ink/30 hover:decoration-terracotta/50 underline-offset-4"
                    >
                      Copy link
                    </button>
                    <button 
                      onClick={() => {
                        toggleItem(filteredMedia[selectedIndex].id);
                        handleToast(savedItems.includes(filteredMedia[selectedIndex].id) ? "Removed from My desk" : "Saved to My desk");
                      }}
                      className="text-terracotta hover:text-ink flex items-center gap-1"
                    >
                      <Doodle type="bookmark" className="w-4 h-4" fill={savedItems.includes(filteredMedia[selectedIndex].id) ? "currentColor" : "none"} />
                      {savedItems.includes(filteredMedia[selectedIndex].id) ? "Saved" : "Save to desk"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

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