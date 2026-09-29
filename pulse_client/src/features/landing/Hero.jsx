import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Paperclip } from 'lucide-react';
import PillButton from '../../components/ui/PillButton';
import { useNavigate } from 'react-router-dom';

const PROMPTS = [
  "I'm in class 9 and want to understand why Antarctic ice is melting. Show me simple data and a short video.",
  "Pull up the latest field reports from Bharati station regarding aurora sightings this week.",
  "Compare the ice core datasets from the Arctic and Antarctic missions from 2018 to 2022."
];

export default function Hero() {
  const [promptText, setPromptText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Parallax setup
  const farY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 20]);
  const midY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 60]);
  const nearY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 100]);

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setPromptText(PROMPTS[0]);
      return;
    }
    
    const currentFullText = PROMPTS[promptIndex];
    let timeout;
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setPromptText(prev => prev.slice(0, -1));
        if (promptText === "") {
          setIsDeleting(false);
          setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
        }
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setPromptText(currentFullText.slice(0, promptText.length + 1));
        if (promptText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 4000); // Pause before deleting
        }
      }, 60);
    }
    return () => clearTimeout(timeout);
  }, [promptText, isDeleting, promptIndex, prefersReducedMotion]);

  const titleWords = "What do you want to know about".split(" ");

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = userInput.trim() || promptText;
    navigate(`/explore?q=${encodeURIComponent(q)}`);
  };

  const handleChipClick = (chip) => {
    navigate(`/explore?q=${encodeURIComponent(chip)}`);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-64 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Drifting Clouds SVG (Background) */}
      {!prefersReducedMotion && (
        <motion.svg 
          animate={{ x: [0, -100, 0] }} 
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[10%] w-32 h-16 opacity-30 pointer-events-none" 
          viewBox="0 0 100 50" stroke="currentColor" fill="none" strokeWidth="1"
        >
          <path d="M30 35 C20 35, 15 25, 25 20 C30 10, 45 10, 50 15 C60 5, 80 10, 85 20 C95 25, 90 35, 80 35 Z" />
        </motion.svg>
      )}

      <div className="max-w-4xl mx-auto px-6 relative z-40 flex flex-col items-center text-center mt-8">
        
        <h1 className="font-grotesque text-[clamp(3rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-ink mb-6 text-balance">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: i * 0.08 }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: titleWords.length * 0.08 }}
            className="inline-block text-terracotta relative"
          >
            the poles?
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/40" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-ink/65 text-lg md:text-xl font-body max-w-2xl text-balance mb-12"
        >
          Ask our assistant anything about Antarctica and the Arctic, and we'll pull up research, datasets, photos and stories made for you.
        </motion.p>

        {/* Prompt Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          className="w-full max-w-[720px]"
        >
          <form 
            onSubmit={handleSearch}
            className="relative bg-paper-lighter rounded-3xl p-6 shadow-paper-soft wobble-edge border border-ink/10 flex flex-col min-h-[160px] text-left cursor-text"
            onClick={(e) => e.currentTarget.querySelector('textarea').focus()}
          >
            <div className="relative flex-grow min-h-[80px]">
              {userInput === "" && (
                <p className="absolute inset-0 font-typewriter text-ink/50 text-lg leading-relaxed pointer-events-none">
                  {promptText}
                  <span className="animate-pulse ml-1 inline-block w-2 h-5 bg-terracotta/60 align-middle -mt-1" />
                </p>
              )}
              <textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-full bg-transparent font-typewriter text-ink/90 text-lg leading-relaxed resize-none focus:outline-none relative z-10"
                rows={3}
              />
            </div>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-ink/5">
              <button type="button" className="text-ink/40 hover:text-ink/80 transition-colors flex items-center gap-2 text-sm font-body">
                <Paperclip size={18} strokeWidth={1.5} />
                Attach file
              </button>
              <PillButton onClick={handleSearch}>Search the archive</PillButton>
            </div>
          </form>
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="relative mt-6 py-2 px-12 flex flex-wrap items-center justify-center gap-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-paper to-transparent opacity-95 -z-10 w-[120%] -left-[10%]" />
          
          {["Life at Bharati station", "Ice core datasets", "Ask a scientist"].map((chip) => (
            <button 
              key={chip} 
              onClick={() => handleChipClick(chip)}
              className="text-sm font-body text-ink/70 hover:text-ink relative group"
            >
              {chip}
              <svg className="absolute -bottom-1 left-0 w-full h-1 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 8 100 2" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          ))}
        </motion.div>

      </div>

      {/* Landscape Scene Layers */}
      <div 
        className="absolute -bottom-[60px] left-0 w-full h-[50vh] pointer-events-none overflow-visible mix-blend-multiply flex items-end justify-center z-10"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)'
        }}
      >
        {/* Fallback stylized shapes simulating hand-drawn mountains if image is missing */}
        <motion.div style={{ y: farY, clipPath: 'polygon(0 100%, 0 70%, 15% 40%, 35% 60%, 55% 20%, 75% 55%, 100% 30%, 100% 100%)' }} className="absolute bottom-0 w-full h-[60%] bg-glacier/20" />
        <motion.div style={{ y: midY, clipPath: 'polygon(0 100%, 0 60%, 20% 35%, 45% 50%, 70% 25%, 90% 45%, 100% 40%, 100% 100%)' }} className="absolute bottom-0 w-full h-[45%] bg-teal-ink/10" />
        <motion.div style={{ y: nearY, clipPath: 'polygon(0 100%, 0 20%, 10% 5%, 30% 25%, 60% 10%, 85% 30%, 100% 15%, 100% 100%)' }} className="absolute bottom-0 w-full h-[25%] bg-paper-deep/80" />
          
        {/* Actual requested image usage */}
        <motion.img 
          src="/hero-scene.png" 
          alt="Polar landscape illustration" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            y: nearY,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)'
          }}
          className="absolute bottom-0 w-full object-cover max-sm:object-[30%_bottom] md:object-bottom max-h-[80vh] mix-blend-multiply"
          onError={(e) => {
            e.target.style.display = 'none';
            console.error("Image failed to load. Check if it is in the public/ folder.");
          }} 
        />
        
        {/* Fade mask into next section */}
        <div className="absolute -bottom-1 left-0 w-full h-32 bg-gradient-to-t from-paper to-transparent z-10" />
      </div>
    </section>
  );
}