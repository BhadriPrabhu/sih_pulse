import { motion } from 'framer-motion';

export default function PaperCard({ children, className = "", rotation = 0 }) {
  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={{ 
        rotate: 0, 
        y: -6, 
        transition: { type: "spring", stiffness: 100, damping: 15 } 
      }}
      className={`bg-[#FCF9F1] rounded-2xl shadow-[0_10px_30px_rgba(120,90,50,0.12)] hover:shadow-[0_15px_40px_rgba(120,90,50,0.16)] p-8 border border-ink/5 ${className}`}
    >
      {children}
    </motion.div>
  );
}