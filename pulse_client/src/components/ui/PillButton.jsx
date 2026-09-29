import { motion } from 'framer-motion';

export default function PillButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      className={`bg-ink text-paper px-6 py-2.5 rounded-full font-body font-medium text-[15px] transition-colors hover:bg-teal-ink ${className}`}
    >
      {children}
    </motion.button>
  );
}