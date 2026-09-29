import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip } from 'lucide-react';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';

export default function ExplorePage() {
  const [isSearching, setIsSearching] = useState(true);
  const [prompt, setPrompt] = useState("I'm in class 9 and want to understand why Antarctic ice is melting. Show me simple data and a short video.");

  // Simulate AI search delay
  useEffect(() => {
    const timer = setTimeout(() => setIsSearching(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (isSearching) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center relative z-10 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Hand-drawn scribble animation */}
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="text-terracotta">
            <motion.path 
              d="M5 20 Q 20 5 35 25 T 65 15 T 90 25 T 115 10" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
          </svg>
          <p className="font-typewriter text-xl text-ink">Digging through the archive...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <PageShell 
      title="Your research desk" 
      terracottaWord="desk"
      subtitle="Here is what I gathered from the latest Antarctic field reports and climate databases."
      heroCrop="center 65%"
    >
      <div className="max-w-5xl mx-auto px-6 pb-32 w-full">
        
        {/* Compact Prompt Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="bg-paper-lighter rounded-2xl p-4 shadow-paper-soft wobble-edge border border-ink/10 flex flex-col md:flex-row gap-4 items-center mb-16"
        >
          <div className="flex-grow w-full relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-transparent font-typewriter text-ink/80 text-sm md:text-base resize-none focus:outline-none p-2"
              rows={2}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-ink/10 pt-4 md:pt-0 md:pl-4">
            <button className="text-ink/40 hover:text-ink transition-colors p-2">
              <Paperclip size={18} strokeWidth={1.5} />
            </button>
            <PillButton onClick={() => setIsSearching(true)} className="whitespace-nowrap px-4 py-1.5 text-sm">
              Refine search
            </PillButton>
          </div>
        </motion.div>

        {/* Scientist's Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-start gap-4">
            <Doodle type="iceCore" className="w-10 h-10 text-teal-ink shrink-0 mt-1" fill="#23414A" />
            <div>
              <p className="font-body text-ink/80 text-lg leading-relaxed mb-4">
                The warming of the Southern Ocean is the primary driver here. Unlike the Arctic, where warm air melts ice from above, Antarctica's ice is mostly melting from below. Warmer ocean currents eat away at the <span className="underline decoration-terracotta/40 decoration-2 underline-offset-4">ice shelves</span>—the floating edges of the ice sheet.
              </p>
              <p className="font-body text-ink/80 text-lg leading-relaxed">
                When these shelves thin and break off, they no longer hold back the massive glaciers behind them. I've pulled a visual dataset of the <span className="underline decoration-terracotta/40 decoration-2 underline-offset-4">Thwaites Glacier grounding line</span> and a lesson kit designed for your grade level to explain the physics of sea-level rise.
              </p>
            </div>
          </div>
        </motion.div>

        <h3 className="font-grotesque text-2xl text-ink mb-12">What I found</h3>

        {/* Scattered Results Layout */}
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-x-12 gap-y-16 relative">
          
          {/* Dataset Slip 1 */}
          <PaperCard rotation={-2} className="w-64 min-h-[160px] p-5 !bg-[#F8F5EE] torn-edge relative !shadow-sm hover:!shadow-md">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#EBE5D6] rounded-full shadow-inner opacity-60" />
            <p className="font-typewriter text-xs text-ink/50 uppercase tracking-widest mb-3 mt-2">Dataset // CSV</p>
            <p className="font-body font-medium text-ink leading-snug mb-4">Maitri Station Shelf Temp Probe (Depth: 200m)</p>
            <div className="flex justify-between items-end mt-auto pt-4 border-t border-ink/10 border-dashed">
              <span className="font-typewriter text-[10px] text-ink/60">2.4 MB</span>
              <span className="font-typewriter text-[10px] text-ink/60">2023-2024</span>
            </div>
          </PaperCard>

          {/* Polaroid 1 */}
          <PaperCard rotation={3.5} className="w-56 p-2 pb-8 !bg-white">
            <div className="w-full h-40 bg-glacier relative overflow-hidden border border-ink/5">
               <svg className="absolute bottom-[-10px] w-full h-20 text-paper" viewBox="0 0 100 50"><path d="M0 50L40 10L60 30L100 0V50Z" fill="currentColor"/></svg>
            </div>
            <p className="font-typewriter text-[11px] text-ink/70 mt-3 ml-2 text-center">Calving event, Jan '24</p>
          </PaperCard>

          {/* Lesson Kit */}
          <PaperCard rotation={-1.5} className="w-72 min-h-[200px] flex flex-col p-6 !bg-[#F0F2ED] border-t-[12px] border-t-sage">
            <p className="font-typewriter text-xs text-sage mb-2">Lesson Kit • Class 9-10</p>
            <h4 className="font-grotesque text-xl text-ink mb-2">The Physics of Melting Ice</h4>
            <p className="font-body text-sm text-ink/70 mb-6">Interactive lab simulation showing the difference between sea ice and land ice melt.</p>
            <a href="#" className="font-hand text-lg text-sage hover:text-ink transition-colors mt-auto w-fit">Open folder →</a>
          </PaperCard>

          {/* Video Card */}
          <PaperCard rotation={1} className="w-72 min-h-[220px] p-4 flex flex-col bg-[#FCF9F1]">
            <div className="w-full h-36 bg-teal-ink relative flex items-center justify-center overflow-hidden mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-paper/40 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-4 h-4 text-paper ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3L19 12L5 21V3Z"/></svg>
              </div>
            </div>
            <h4 className="font-body font-medium text-ink mb-1">Under-ice ROV footage</h4>
            <p className="font-typewriter text-xs text-ink/50">3:42 • Recorded near Bharati</p>
          </PaperCard>

          {/* Dataset Slip 2 */}
          <PaperCard rotation={2.5} className="w-60 min-h-[160px] p-5 !bg-[#F8F5EE] torn-edge relative !shadow-sm hover:!shadow-md md:-mt-8">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#EBE5D6] rounded-full shadow-inner opacity-60" />
            <p className="font-typewriter text-xs text-ink/50 uppercase tracking-widest mb-3 mt-2">Dataset // NetCDF</p>
            <p className="font-body font-medium text-ink leading-snug mb-4">Thwaites Grounding Line Retreat Map</p>
            <div className="flex justify-between items-end mt-auto pt-4 border-t border-ink/10 border-dashed">
              <span className="font-typewriter text-[10px] text-ink/60">18.1 MB</span>
              <span className="font-typewriter text-[10px] text-ink/60">Updated 2024</span>
            </div>
          </PaperCard>
          
          {/* Polaroid 2 */}
          <PaperCard rotation={-3} className="w-48 p-2 pb-6 !bg-white md:-mt-12">
            <div className="w-full h-32 bg-terracotta/90 relative overflow-hidden border border-ink/5">
              <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
            </div>
            <p className="font-typewriter text-[11px] text-ink/70 mt-2 ml-1 text-center">Drill camp setup</p>
          </PaperCard>

        </div>
      </div>
    </PageShell>
  );
}