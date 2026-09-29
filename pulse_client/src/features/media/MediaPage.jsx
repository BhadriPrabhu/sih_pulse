import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import { mediaData } from '../../data/mediaData';

const TABS = ["All", "Photos", "Videos", "Aurora", "Wildlife", "Life at station"];

// Helper to render the flat SVG placeholder scenes based on type
function SceneGraphic({ scene }) {
  switch (scene) {
    case 'aurora':
      return (
        <div className="w-full h-full bg-teal-ink relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/4 left-0 w-full h-1/2 bg-sage/60 blur-[10px] transform -rotate-12 rounded-[100%]" />
          <div className="absolute top-1/3 left-10 w-3/4 h-1/3 bg-glacier/40 blur-[12px] transform rotate-6 rounded-[100%]" />
          {/* Subtle stars */}
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
            {/* Simple penguin silhouettes */}
            <div className="w-4 h-8 bg-ink rounded-t-full rounded-b-sm" />
            <div className="w-3 h-6 bg-ink rounded-t-full rounded-b-sm" />
          </div>
          {/* Faint sun */}
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
          {/* Ice chunks */}
          <div className="absolute bottom-4 right-4 w-8 h-4 bg-paper rounded-sm transform rotate-6" />
          <div className="absolute bottom-2 left-6 w-12 h-6 bg-paper rounded-sm transform -rotate-3" />
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

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const filteredMedia = mediaData.filter(m => 
    activeTab === "All" ? true : 
    activeTab === "Photos" ? m.type === "Photo" :
    activeTab === "Videos" ? m.type === "Video" :
    m.category === activeTab
  );

  return (
    <PageShell 
      title="Media library" 
      terracottaWord="library"
      subtitle="Raw footage, timelapses, and expedition photography from the field."
      heroCrop="left 75%" 
    >
      <div className="max-w-7xl mx-auto px-6 pb-32 w-full">
        
        {/* Hand-drawn Underline Filters */}
        <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-16">
          {TABS.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative py-2 font-body text-[15px] hover:text-ink transition-colors group"
            >
              <span className={activeTab === tab ? 'text-ink font-medium' : 'text-ink/60'}>
                {tab}
              </span>
              {activeTab === tab && (
                <motion.svg 
                  layoutId="media-filter-underline"
                  className="absolute -bottom-1 left-0 w-full h-1.5 text-terracotta/70" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
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

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {filteredMedia.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                key={item.id}
                className="break-inside-avoid"
              >
                <div 
                  onClick={() => setSelectedMedia(item)}
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                  className="bg-white p-3 pb-12 shadow-paper-soft hover:shadow-paper-lift transition-shadow border border-ink/5 cursor-pointer relative group"
                >
                  <div className={`w-full ${item.heightClass} border border-ink/5 relative`}>
                    <SceneGraphic scene={item.scene} />
                    {item.type === "Video" && (
                      <div className="absolute inset-0 bg-ink/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
                           <svg className="w-4 h-4 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3L19 12L5 21V3Z"/></svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="font-typewriter text-xs text-ink/70 mt-4 px-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-none flex items-center justify-center p-6 md:p-12"
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div 
                initial={{ y: 20, rotate: -2 }}
                animate={{ y: 0, rotate: 0 }}
                exit={{ y: 20, rotate: 2 }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
                className="bg-white p-4 md:p-6 pb-20 md:pb-24 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative border border-ink/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 md:-right-12 md:-top-12 text-ink md:text-paper font-typewriter text-xl hover:opacity-70 transition-opacity"
                >
                  [x] close
                </button>
                
                <div className="flex-grow w-full bg-paper-deep border border-ink/5 relative overflow-hidden">
                   <SceneGraphic scene={selectedMedia.scene} />
                   {selectedMedia.type === "Video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-ink/20">
                           <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3L19 12L5 21V3Z"/></svg>
                        </div>
                      </div>
                    )}
                </div>

                {/* Back of photo metadata */}
                <div className="absolute bottom-6 left-6 md:left-8 right-6 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-t border-ink/10 pt-4 mt-4 border-dashed">
                  <p className="font-typewriter text-sm md:text-base text-ink">
                    {selectedMedia.caption}
                  </p>
                  <p className="font-typewriter text-xs text-ink/50 uppercase tracking-widest">
                    ID: {selectedMedia.id} // CREDIT: {selectedMedia.credit}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageShell>
  );
}