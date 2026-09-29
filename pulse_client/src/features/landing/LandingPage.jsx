import { motion } from 'framer-motion';
import Hero from './Hero';
import Pillars from './Pillars';
import FieldNotes from './FieldNotes';
import Footer from './Footer';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 70, damping: 20 } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    transition: { duration: 0.2 } 
  }
};

export default function LandingPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex-grow flex flex-col w-full"
    >
      <main>
        <Hero />
        <Pillars />
        <FieldNotes />
      </main>
      <Footer />
    </motion.div>
  );
}