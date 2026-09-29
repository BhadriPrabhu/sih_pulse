import { motion } from 'framer-motion';
import Footer from '../../features/landing/Footer';
import Doodle from '../ui/Doodle';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 70, damping: 20, staggerChildren: 0.08 } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    transition: { duration: 0.2 } 
  }
};

export default function PageShell({ children, title, terracottaWord, subtitle, heroCrop = "center 60%" }) {
  const titleWords = title.split(" ");

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="min-h-screen pt-28 flex flex-col relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full px-6 mb-12">
        
        {/* 1. Slim Header (Safe nested masks to fix rendering glitches) */}
        <div 
          className="h-[140px] md:h-[180px] w-full overflow-hidden mix-blend-multiply opacity-70 pointer-events-none mb-8"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          >
            <img 
              src="/hero-scene.png" 
              alt="" 
              className="w-full h-full object-cover"
              style={{ objectPosition: heroCrop }}
            />
          </div>
        </div>

        {/* 2. Page Typography (Moved to normal flow below the image) */}
        <div className="max-w-3xl ml-2 md:ml-8">
          <h1 className="font-grotesque text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.04em] text-ink mb-4 text-balance">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  initial: { y: 16, opacity: 0 },
                  enter: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 18 } }
                }}
                className={`inline-block mr-3 ${word.toLowerCase() === terracottaWord?.toLowerCase() ? 'text-terracotta relative' : ''}`}
              >
                {word}
                {word.toLowerCase() === terracottaWord?.toLowerCase() && (
                  <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-terracotta/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                )}
              </motion.span>
            ))}
          </h1>
          <motion.p 
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 1 }
            }}
            className="text-ink/65 text-lg font-body"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      <div className="w-full flex justify-center text-ink/15 mb-12 pointer-events-none">
        <Doodle type="wavyDivider" className="w-full max-w-4xl h-8 opacity-50" />
      </div>

      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      <Footer />
    </motion.div>
  );
}