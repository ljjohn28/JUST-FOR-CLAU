
import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from './HeartIcon';

const COLORS = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];

export const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            scale: 0.5 + Math.random(),
            opacity: 0.2 + Math.random() * 0.4
          }}
          animate={{ 
            y: '-10vh',
            x: `${(Math.random() - 0.5) * 20 + (i * 7)}vw`,
            rotate: 360 
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          style={{ color: COLORS[i % COLORS.length] }}
        >
          <HeartIcon size={24 + Math.random() * 32} />
        </motion.div>
      ))}
    </div>
  );
};
