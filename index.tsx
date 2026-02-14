
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONSTANTES Y TIPOS ---
const COLORS = ['#FF4D6D', '#70D6FF', '#FF70A6', '#FF9770', '#FFD670', '#E9FF70'];

interface HeartPosition {
  x: number;
  y: number;
  scale: number;
  delay: number;
  color: string;
}

// --- COMPONENTES AUXILIARES ---

const HeartIcon = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 15 }), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ y: '110vh', x: `${Math.random() * 100}vw`, scale: 0.5 + Math.random(), opacity: 0.1 }}
          animate={{ y: '-10vh', rotate: 360 }}
          transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 20, ease: "linear" }}
          style={{ color: COLORS[i % COLORS.length] }}
        >
          <HeartIcon size={20 + Math.random() * 30} />
        </motion.div>
      ))}
    </div>
  );
};

const TerminalIntro = ({ onUnlock }: { onUnlock: () => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '[SYSTEM] Initializing love_kernel...',
    '[LOG] Modules loaded: affection, loyalty, laughter',
    '[AUTH] Please authenticate to proceed.',
    '[HINT] TO ENTER, YOU MUST USE THE WAY I LIKE TO BE CALLED.'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (cmd === 'sudo unlock papi') {
      setHistory(prev => [...prev, `$ ${input}`, '>> ACCESS GRANTED. DECRYPTING ROMANCE...']);
      setTimeout(onUnlock, 1200);
    } else {
      setHistory(prev => [...prev, `$ ${input}`, `Error: '${cmd}' is not recognized. Did you mean 'sudo unlock papi'?`]);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#161b22] w-full max-w-lg rounded-lg border border-[#30363d] shadow-2xl overflow-hidden"
    >
      <div className="bg-[#21262d] p-3 flex items-center space-x-2 border-b border-[#30363d]">
        <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-400 text-[10px] ml-4 font-mono tracking-widest uppercase">bash — secure_heart_v2.0</span>
      </div>
      <div className="p-5 space-y-2 h-72 overflow-y-auto font-mono text-sm">
        {history.map((line, i) => {
          let colorClass = 'text-pink-400/80';
          if (line.includes('GRANTED')) colorClass = 'text-green-400 font-bold';
          if (line.includes('[HINT]')) colorClass = 'text-yellow-400';
          if (line.startsWith('$')) colorClass = 'text-blue-400';
          
          return (
            <div key={i} className={colorClass}>
              {line}
            </div>
          );
        })}
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input 
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-white caret-pink-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="..."
          />
        </form>
      </div>
    </motion.div>
  );
};

const ValentineQuestion = ({ onAccept }: { onAccept: () => void }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveNo = () => {
    setNoPos({ x: Math.random() * 300 - 150, y: Math.random() * 200 - 100 });
    setAttempts(a => a + 1);
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <div className="bg-[#161b22] p-10 rounded-2xl border border-pink-500/20 shadow-[0_0_50px_rgba(255,77,109,0.1)] w-full font-mono">
        <div className="text-blue-400 mb-2 opacity-60 text-xs">// Automated logic check</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-relaxed text-white">
          <span className="text-pink-500">if</span> (you.stayWithMe && love.isTrue) {'{'}
          <br />
          &nbsp;&nbsp;<span className="text-yellow-400 ml-4">return</span> <span className="text-green-400">"Be My Valentine?"</span>;
          <br />
          {'}'}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 relative min-h-[140px]">
          <motion.button
            onClick={onAccept}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-bold shadow-lg z-20"
          >
            true;
          </motion.button>
          
          <motion.button
            onMouseEnter={moveNo}
            animate={{ x: noPos.x, y: noPos.y }}
            className="bg-[#21262d] text-gray-500 px-6 py-2 rounded-lg text-sm border border-gray-800 z-10"
          >
            throw Error("No");
          </motion.button>
        </div>
      </div>
      <motion.img 
        src="https://media.tenor.com/MFE97_7Tz5GAAAAi/coding-cat.gif" 
        className="w-40 h-40 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </div>
  );
};

const Tree = () => {
  const heartPositions = useMemo(() => {
    const pos: HeartPosition[] = [];
    for (let i = 0; i < 150; i++) {
      const t = Math.random() * 2 * Math.PI;
      const r = 0.8 + Math.random() * 0.4;
      const x = 16 * Math.pow(Math.sin(t), 3) * r;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
      const scale = 5 + Math.random() * 7;
      pos.push({
        x: x * scale, y: y * scale - 150, scale: 0.4 + Math.random() * 0.6,
        delay: 1.5 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
    return pos;
  }, []);

  const binaryRain = useMemo(() => Array.from({ length: 30 }).map(() => ({
    x: Math.random() * 500 - 250, y: Math.random() * 400 - 400,
    char: Math.random() > 0.5 ? '1' : '0', delay: Math.random() * 5
  })), []);

  return (
    <div className="relative w-full h-[550px] flex items-end justify-center perspective-1000">
      <svg width="600" height="550" viewBox="0 0 600 550" className="absolute bottom-0 drop-shadow-[0_0_15px_rgba(255,77,109,0.1)]">
        {binaryRain.map((p, i) => (
          <motion.text key={i} x={300 + p.x} y={200 + p.y} fill="#1f2937" fontSize="10" fontFamily="monospace"
            initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 0.4, 0], y: 450 }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: p.delay }}
          >
            {p.char}
          </motion.text>
        ))}
        <motion.path d="M300 550 L300 350 M300 450 L240 380 M300 420 L360 350" stroke="#30363d" strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
      </svg>
      <div className="absolute top-[220px] left-1/2 -translate-x-1/2">
        {heartPositions.map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: pos.x, top: pos.y, color: pos.color }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: pos.scale, opacity: 1 }}
            transition={{ delay: pos.delay, duration: 1 }}
          >
            <motion.div animate={{ y: [0, -8, 0], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}>
              <HeartIcon size={12 + Math.random() * 12} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ startDate }: { startDate: string }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const start = new Date(startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="font-mono bg-[#0d1117]/80 backdrop-blur-sm p-6 rounded-xl border border-[#30363d] shadow-xl">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] text-green-500/80 tracking-widest uppercase">Affection Engine: Active</span>
      </div>
      <p className="text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-widest">Days of Uptime (Ref: 01 Nov 2025):</p>
      <div className="grid grid-cols-4 gap-3 text-center">
        {[{l: 'DAYS', v: time.d}, {l: 'HRS', v: time.h}, {l: 'MIN', v: time.m}, {l: 'SEC', v: time.s}].map((item, i) => (
          <div key={i} className="bg-[#161b22] p-2 rounded border border-[#30363d]">
            <div className="text-2xl font-bold text-pink-500">{String(item.v).padStart(2, '0')}</div>
            <div className="text-[8px] text-gray-600 mt-1">{item.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[9px] text-blue-400 font-mono italic opacity-60">
        // 105 days total (Nov 1 to Feb 13)
      </div>
    </div>
  );
};

const TypingLog = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] shadow-2xl relative overflow-hidden font-mono min-h-[140px]">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500/0 via-pink-500/50 to-pink-500/0" />
      <div className="text-[10px] text-gray-600 mb-3 uppercase tracking-tighter">heart_output.log</div>
      <p className="text-sm md:text-base text-gray-300 leading-relaxed italic">
        {displayed}<span className="inline-block w-1.5 h-4 bg-pink-500 ml-1 animate-pulse" />
      </p>
    </div>
  );
};

// --- APP PRINCIPAL ---

const App = () => {
  const [phase, setPhase] = useState<'intro' | 'question' | 'result'>('intro');

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 lg:p-12 overflow-hidden bg-[#0d1117]">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, y: -20 }} className="z-20 text-center">
             <h1 className="text-pink-500 font-bold mb-6 tracking-widest text-sm">&gt; STARTING SECURE_PROTOCOL_VALENTINE</h1>
             <TerminalIntro onUnlock={() => setPhase('question')} />
          </motion.div>
        )}

        {phase === 'question' && (
          <motion.div key="question" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="z-20 w-full">
            <ValentineQuestion onAccept={() => setPhase('result')} />
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div className="flex justify-center order-2 lg:order-1" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
              <Tree />
            </motion.div>

            <div className="space-y-8 order-1 lg:order-2">
              <TypingLog text="[INFO] Compilando sentimientos... OK. Ejecutando protocolo de felicidad... OK. Se ha detectado un bucle infinito de amor en el sistema local. Eres la variable que le da sentido a mi código y la constante que ilumina mi terminal. I love you in binary, hex and plain text. ❤️" />
              
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 3 }}>
                {/* 1 DE NOVIEMBRE DE 2025 */}
                <Counter startDate="2025-11-01T00:00:00" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="flex items-center justify-between bg-[#161b22]/50 p-4 rounded-lg border border-[#30363d] text-[10px] text-gray-500 font-mono">
                <div>
                  <span className="text-pink-500">commit</span>: Initial_Heart_Deployment
                  <br />
                  <span className="text-blue-500">author</span>: Your_Nerd_Valentine
                </div>
                <div className="flex items-center space-x-2">
                  <HeartIcon size={16} className="text-pink-500 animate-pulse" />
                  <span className="text-pink-500 font-bold">SHA: LOVE_2025</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="scanline"></div>
      <div className="noise"></div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
