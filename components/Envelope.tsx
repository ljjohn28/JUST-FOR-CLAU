
import React from 'react';
import { motion } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  return (
    <motion.div 
      className="relative cursor-pointer group"
      onClick={onOpen}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-[#FFADAD] w-64 h-48 md:w-80 md:h-56 rounded-b-lg shadow-2xl relative flex items-center justify-center">
        {/* Solapa del sobre */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#FF8FA3] origin-top rounded-t-lg group-hover:rotate-x-180 transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}></div>
        
        {/* Corazón central */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="z-20 text-white drop-shadow-lg"
        >
          <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <p className="absolute bottom-4 text-white font-cursive text-xl opacity-80 uppercase tracking-widest">Toca para abrir</p>
      </div>
    </motion.div>
  );
};
