
import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { HeartIcon } from './HeartIcon';
import { HeartPosition } from '../types';

const COLORS = ['#FF4D6D', '#70D6FF', '#FF70A6', '#FF9770', '#FFD670', '#E9FF70'];

const generateHeartPositions = (count: number): HeartPosition[] => {
  const positions: HeartPosition[] = [];
  for (let i = 0; i < count; i++) {
    const t = Math.random() * 2 * Math.PI;
    const r = 0.8 + Math.random() * 0.4;
    const x = 16 * Math.pow(Math.sin(t), 3) * r;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
    
    const scale = 5 + Math.random() * 6;
    positions.push({
      x: x * scale,
      y: y * scale - 140,
      scale: 0.5 + Math.random() * 0.8,
      delay: 2 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
  return positions;
};

export const Tree: React.FC = () => {
  const heartPositions = useMemo(() => generateHeartPositions(150), []);

  const binaryParticles = useMemo(() => Array.from({ length: 40 }).map(() => ({
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 400,
    char: Math.random() > 0.5 ? '1' : '0',
    delay: Math.random() * 5
  })), []);

  const heartVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      filter: [`drop-shadow(0 0 2px ${COLORS[i % COLORS.length]})`, `drop-shadow(0 0 10px ${COLORS[i % COLORS.length]})`, `drop-shadow(0 0 2px ${COLORS[i % COLORS.length]})`],
      transition: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
    })
  };

  return (
    <div className="relative w-full h-[550px] flex items-end justify-center perspective-1000">
      <svg width="600" height="550" viewBox="0 0 600 550" className="absolute bottom-0">
        <defs>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#21262d" />
            <stop offset="50%" stopColor="#484f58" />
            <stop offset="100%" stopColor="#21262d" />
          </linearGradient>
        </defs>

        {/* Binary Rain Background */}
        {binaryParticles.map((p, i) => (
          <motion.text
            key={i}
            x={300 + p.x}
            y={200 + p.y}
            fill="#30363d"
            fontSize="10"
            fontFamily="monospace"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: 400 }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: p.delay }}
          >
            {p.char}
          </motion.text>
        ))}

        {/* Tronco Digital */}
        <motion.path
          d="M300 550 L300 350 M300 450 L240 380 M300 420 L360 350"
          stroke="url(#trunkGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Glow effect at root */}
        <circle cx="300" cy="550" r="40" fill="url(#rootGlow)" opacity="0.2" />
        <radialGradient id="rootGlow">
          <stop offset="0%" stopColor="#FF4D6D" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </svg>

      <div className="absolute top-[200px] left-1/2 -translate-x-1/2">
        {heartPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pos.x, top: pos.y, color: pos.color }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: pos.scale, opacity: 1 }}
            transition={{ delay: pos.delay, duration: 1 }}
          >
            <motion.div custom={i} variants={heartVariants} animate="animate">
              <HeartIcon size={12 + Math.random() * 10} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
