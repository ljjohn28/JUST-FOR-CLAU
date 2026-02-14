
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ValentineQuestionProps {
  onAccept: () => void;
}

export const ValentineQuestion: React.FC<ValentineQuestionProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveNoButton = () => {
    const newX = Math.random() * 300 - 150;
    const newY = Math.random() * 300 - 150;
    setNoButtonPos({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="bg-[#161b22] p-8 rounded-xl border border-pink-500/30 shadow-[0_0_30px_rgba(255,77,109,0.1)] w-full max-w-2xl font-mono">
        <div className="flex space-x-2 mb-4 opacity-50">
          <span className="text-blue-400">import</span> 
          <span className="text-yellow-400">Happiness</span> 
          <span className="text-blue-400">from</span> 
          <span className="text-green-400">'us'</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          <span className="text-pink-500">if</span> (user.isAwesome && you.areTheOne) {'{'}
          <br />
          &nbsp;&nbsp;<span className="text-yellow-400 ml-4">return</span> <span className="text-green-400">"Be My Valentine?"</span>
          <br />
          {'}'}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-6 relative min-h-[120px]">
          <motion.button
            onClick={onAccept}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-10 py-4 rounded-md text-xl font-bold shadow-lg z-20 font-mono"
          >
            true; // SÍ
          </motion.button>
          
          <motion.button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            className="bg-[#21262d] text-gray-400 px-6 py-2 rounded-md text-sm font-mono border border-gray-700 z-10"
          >
            throw Error("No");
          </motion.button>
        </div>

        {attempts > 3 && (
          <p className="mt-4 text-xs text-red-400 text-center animate-pulse">
            Warning: Recalculating logic... You can't escape my heart.
          </p>
        )}
      </div>
      
      <motion.img 
        src="https://media.tenor.com/MFE97_7Tz5GAAAAi/coding-cat.gif" 
        className="w-32 h-32 opacity-80"
      />
    </div>
  );
};
