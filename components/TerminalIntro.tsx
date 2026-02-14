
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalIntroProps {
  onUnlock: () => void;
}

export const TerminalIntro: React.FC<TerminalIntroProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '$ Initializing love_module.sh...', 
    '$ Scanning heart_rate... OK', 
    '$ systemctl status affection.service --active',
    '[HINT] TO ENTER, YOU MUST USE THE WAY I LIKE TO BE CALLED.'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (cmd === 'sudo unlock papi') {
      setHistory(prev => [...prev, `$ ${input}`, 'ACCESS GRANTED. DECRYPTING ROMANCE...']);
      setTimeout(onUnlock, 1000);
    } else {
      setHistory(prev => [...prev, `$ ${input}`, 'Error: Command not found. Try "sudo unlock papi"']);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#161b22] w-full max-w-lg rounded-lg border border-[#30363d] shadow-2xl overflow-hidden font-mono text-sm"
    >
      <div className="bg-[#21262d] p-2 flex items-center space-x-2 border-b border-[#30363d]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-gray-400 text-xs ml-4">bash — valentine_decryption</span>
      </div>
      <div className="p-4 space-y-1 h-64 overflow-y-auto">
        {history.map((line, i) => {
          let colorClass = 'text-pink-400';
          if (line.includes('ACCESS')) colorClass = 'text-green-400';
          if (line.includes('[HINT]')) colorClass = 'text-yellow-400';
          if (line.startsWith('$')) colorClass = 'text-blue-400';
          
          return (
            <div key={i} className={colorClass}>
              {line}
            </div>
          );
        })}
        <form onSubmit={handleCommand} className="flex">
          <span className="text-green-400 mr-2">$</span>
          <input 
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='sudo unlock...'
          />
        </form>
      </div>
    </motion.div>
  );
};
