import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Paperclip } from 'lucide-react';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';

export default function Hero() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [promptText, setPromptText] = useState("");
  const fullPrompt = "What would you like to know about the poles?";
  const textareaRef = useRef(null);

  // Background Parallax
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);
  const yMid = useTransform(scrollY, [0, 1000], [0, 100]);
  const yFront = useTransform(scrollY, [0, 1000], [0, 0]);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullPrompt.length) {
        setPromptText(fullPrompt.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 40);
    return () => clearInterval(typing);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = userInput.trim() || fullPrompt;
    navigate(`/explore?q=${encodeURIComponent(q)}`);
  };

  const handleChipClick = (chip) => {
    navigate(`/explore?q=${encodeURIComponent(chip)}`);
  };

  // Auto-grow textarea handler
  const handleInput = (e) => {
    setUserInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 md:px-6 z-20 overflow-hidden">
      
      {/* Background Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-60">
        <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[url('/hero-scene.png')] bg-cover bg-center md:bg-[center_top_-100px] opacity-40 scale-110" />
        <motion.div style={{ y: yMid }} className="absolute inset-0 bg-[url('/hero-scene.png')] bg-cover bg-center md:bg-[center_top_-50px] opacity-60 scale-105" />
        <motion.div style={{ y: yFront }} className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
      </div>

      <div className="w-full max-w-[720px] relative z-20 flex flex-col items-center">
        
        {/* Main Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="font-grotesque text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-ink text-center mb-10 text-balance"
        >
          <span className="block mb-2">Explore the</span>
          <span className="relative inline-block text-terracotta">
            frontlines
            <svg className="absolute -bottom-2 left-0 w-full h-3 md:h-4 text-terracotta/30" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          {' '}of climate.
        </motion.h1>

        {/* Prompt Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 15 }}
          className="w-full"
        >
          <form 
            onSubmit={handleSearch}
            className="relative bg-paper-lighter rounded-3xl p-4 md:p-6 shadow-paper-soft wobble-edge border border-ink/10 flex flex-col w-full text-left cursor-text"
            onClick={() => textareaRef.current?.focus()}
          >
            {/* Textarea Area (Normal flow) */}
            <div className="relative w-full flex flex-col">
              {userInput === "" && (
                <div className="absolute inset-0 pointer-events-none">
                  <p 
                    className="font-typewriter text-[15px] md:text-lg text-ink/50 leading-relaxed" 
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {promptText}
                    <span className="animate-pulse ml-1 inline-block w-2 h-[1em] bg-terracotta/60 align-middle -mt-1" />
                  </p>
                </div>
              )}
              <textarea 
                ref={textareaRef}
                value={userInput}
                onInput={handleInput}
                className="w-full flex-grow bg-transparent font-typewriter text-[15px] md:text-lg text-ink/90 leading-relaxed resize-none focus:outline-none relative z-10 min-h-[120px] md:min-h-[80px]"
                rows={1}
              />
            </div>
            
            {/* Footer Row */}
            <div className="relative mt-2 md:mt-4 pt-4 md:pt-5 flex items-center justify-between gap-3">
              
              {/* Wavy divider on mobile */}
              <div className="absolute top-0 left-0 w-full md:hidden h-2 overflow-hidden text-ink/15 flex items-start -mt-1">
                <Doodle type="wavyDivider" className="w-[150%] h-full opacity-60" />
              </div>
              {/* Standard border on desktop */}
              <div className="absolute top-0 left-0 w-full hidden md:block border-t border-ink/5" />

              <button 
                type="button" 
                className="text-ink/40 hover:text-ink/80 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] md:min-h-0 md:min-w-0 md:gap-2 text-sm font-body shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-md"
              >
                <Paperclip size={18} strokeWidth={1.5} />
                <span className="hidden md:inline">Attach file</span>
              </button>

              <PillButton onClick={handleSearch} className="whitespace-nowrap px-5 py-3 shrink-0">
                <span className="hidden min-[400px]:inline">Search the archive</span>
                <span className="inline min-[400px]:hidden">Search</span>
              </PillButton>
            </div>
          </form>
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mt-6 py-2 px-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-paper to-transparent opacity-95 -z-10 w-[120%] -left-[10%] hidden md:block" />
          
          {["Life at Bharati station", "Ice core datasets", "Ask a scientist"].map((chip) => (
            <button 
              key={chip} 
              onClick={() => handleChipClick(chip)}
              className="text-[13px] md:text-sm font-body text-ink/70 hover:text-ink relative group outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm px-1 text-center"
            >
              {chip}
              <svg className="absolute -bottom-1 left-0 w-full h-1 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 8 100 2" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}