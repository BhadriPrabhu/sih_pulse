import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';

export default function LoginPage() {
  const [role, setRole] = useState("Student");

  return (
    <PageShell 
      title="Welcome back" 
      terracottaWord="back"
      subtitle="Access your saved datasets, expedition logs, and field notes."
      heroCrop="55% 85%" 
    >
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full mt-4 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Column: Quote & Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="w-full md:w-1/2 flex flex-col items-start relative pl-4 md:pl-12"
        >
          {/* Subtle dashed line accent */}
          <div className="absolute top-0 left-0 w-2 h-full border-l-2 border-ink/10 border-dashed hidden md:block" />
          
          <h2 className="font-grotesque text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight text-ink mb-12 relative z-10 text-balance">
            “Pick up where you <span className="text-terracotta relative">
              left off.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>”
          </h2>
          
          <div className="flex items-center gap-4 text-ink/40">
            <Doodle type="penguin" className="w-12 h-12 origin-bottom transform -rotate-12" stroke="currentColor" />
            <span className="font-hand text-xl">we kept your desk warm</span>
          </div>
        </motion.div>

        {/* Right Column: Hand-crafted Login Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <PaperCard rotation={0.8} className="w-full max-w-md p-8 md:p-12 flex flex-col relative !bg-[#FCF9F1] min-h-[420px]">
            
            {/* Role Toggle */}
            <div className="flex items-center justify-between gap-2 mb-14 px-2">
              {["Student", "Researcher", "Teacher"].map(r => {
                const isSelected = role === r;
                return (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className="relative font-body text-[15px] hover:text-ink transition-colors group px-2 py-1"
                  >
                    <span className={isSelected ? 'text-ink font-medium' : 'text-ink/60'}>{r}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <svg className="absolute inset-0 w-[120%] h-[140%] -left-[10%] -top-[20%] text-terracotta pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <motion.path 
                            d="M 50 2 C 80 2, 95 10, 95 20 C 95 30, 80 38, 50 38 C 20 38, 5 30, 5 20 C 5 10, 20 2, 50 2 Z" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </svg>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Form Fields (Lines on paper) */}
            <div className="flex flex-col gap-10 mb-16">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-typewriter text-ink placeholder:text-ink/30 transition-colors"
                />
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-typewriter text-ink placeholder:text-ink/30 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-auto">
              <a href="#" className="font-body text-sm font-medium text-teal-ink hover:text-terracotta transition-colors relative group">
                Create an account
                <svg className="absolute -bottom-1 left-0 w-full h-1 text-teal-ink/30 group-hover:text-terracotta/60 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <PillButton className="px-8 shadow-sm">Log in</PillButton>
            </div>
            
          </PaperCard>
        </motion.div>

      </div>
    </PageShell>
  );
}