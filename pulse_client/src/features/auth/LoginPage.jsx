import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("Student");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && !name.trim()) {
      return setError("Please tell us your name.");
    }
    if (!email.includes("@")) {
      return setError("That email doesn't look quite right.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    // Mock Login
    login({ name: isSignup ? name : "Researcher", email, role });
    navigate('/my-desk');
  };

  return (
    <PageShell heroCrop="55% 85%">
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full mt-4 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Column: Quote & Graphic */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 70, damping: 20 }} className="w-full md:w-1/2 flex flex-col items-start relative pl-4 md:pl-12">
          <div className="absolute top-0 left-0 w-2 h-full border-l-2 border-ink/10 border-dashed hidden md:block" />
          
          <h2 className="font-grotesque text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight text-ink mb-12 relative z-10 text-balance">
            “Pick up where you <span className="text-terracotta relative">
              left off.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/30" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
            </span>”
          </h2>
          
          <div className="flex items-center gap-4 text-ink/40">
            <Doodle type="penguin" className="w-12 h-12 origin-bottom transform -rotate-12" stroke="currentColor" />
            <span className="font-hand text-xl">we kept your desk warm</span>
          </div>
        </motion.div>

        {/* Right Column: Auth Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }} className="w-full md:w-1/2 flex justify-center md:justify-end">
          <PaperCard rotation={0.8} className="w-full max-w-md p-8 md:p-12 flex flex-col relative !bg-[#FCF9F1] min-h-[420px]">
            
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {/* Role Toggle */}
              <div className="flex items-center justify-between gap-2 mb-10 px-2">
                {["Student", "Researcher", "Teacher"].map(r => {
                  const isSelected = role === r;
                  return (
                    <button type="button" key={r} onClick={() => setRole(r)} className="relative font-body text-[15px] hover:text-ink transition-colors group px-2 py-1 outline-none">
                      <span className={isSelected ? 'text-ink font-medium' : 'text-ink/60'}>{r}</span>
                      <AnimatePresence>
                        {isSelected && (
                          <svg className="absolute inset-0 w-[120%] h-[140%] -left-[10%] -top-[20%] text-terracotta pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <motion.path d="M 50 2 C 80 2, 95 10, 95 20 C 95 30, 80 38, 50 38 C 20 38, 5 30, 5 20 C 5 10, 20 2, 50 2 Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                          </svg>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-10 mb-8">
                {isSignup && (
                  <div className="relative">
                    <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-typewriter text-ink placeholder:text-ink/30 transition-colors" />
                  </div>
                )}
                <div className="relative">
                  <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-typewriter text-ink placeholder:text-ink/30 transition-colors" />
                </div>
                <div className="relative">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-typewriter text-ink placeholder:text-ink/30 transition-colors" />
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-typewriter text-terracotta text-sm mb-6">
                  {error}
                </motion.p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-auto pt-8">
                <button type="button" onClick={() => { setIsSignup(!isSignup); setError(""); }} className="font-body text-sm font-medium text-teal-ink hover:text-terracotta transition-colors relative group outline-none">
                  {isSignup ? "Log in instead" : "Create an account"}
                  <svg className="absolute -bottom-1 left-0 w-full h-1 text-teal-ink/30 group-hover:text-terracotta/60 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
                <PillButton type="submit" className="px-8 shadow-sm">{isSignup ? "Sign up" : "Log in"}</PillButton>
              </div>
            </form>
            
          </PaperCard>
        </motion.div>

      </div>
    </PageShell>
  );
}