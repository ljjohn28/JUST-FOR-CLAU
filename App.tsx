
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tree } from './components/Tree';
import { Counter } from './components/Counter';
import { TypingText } from './components/TypingText';
import { FloatingHearts } from './components/FloatingHearts';
import { TerminalIntro } from './components/TerminalIntro';
import { ValentineQuestion } from './components/ValentineQuestion';
import { HeartIcon } from './components/HeartIcon';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'question' | 'result'>('intro');
  
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0d1117] overflow-hidden p-4 font-mono">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-20 flex flex-col items-center"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-pink-500 mb-2">&gt; access_granted --love</h1>
              <p className="text-gray-500 text-sm">Please unlock the encrypted message</p>
            </div>
            <TerminalIntro onUnlock={() => setPhase('question')} />
          </motion.div>
        )}

        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-20 w-full"
          >
            <ValentineQuestion onAccept={() => setPhase('result')} />
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10"
          >
            {/* Sección Izquierda: El Árbol Digital */}
            <motion.div 
              className="flex justify-center order-2 lg:order-1 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Tree />
            </motion.div>

            {/* Sección Derecha: Logs de Amor */}
            <div className="space-y-6 order-1 lg:order-2 px-6 lg:px-0">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg shadow-2xl relative overflow-hidden"
              >
                {/* Window Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-blue-500" />
                
                <div className="mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Message_Output.log</span>
                </div>
                
                <TypingText 
                  text="Compilando sentimientos... OK. Ejecutando protocolo de felicidad... OK. Se ha detectado un bucle infinito de amor en el sistema. Eres la variable que le da sentido a mi código y la constante que ilumina mi terminal. I love you in binary, hex and plain text. ❤️"
                  delay={1}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                {/* Referencia 1 de Noviembre 2025 A 13 de Febrero 2026 */}
                <Counter startDate="2025-11-01T00:00:00" />
              </motion.div>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 6 }}
                className="flex items-center justify-between bg-[#21262d] p-4 rounded-lg border border-[#30363d]"
              >
                <div className="text-xs text-gray-400">
                  <span className="text-pink-500">commit</span>: Initial Heart Release
                  <br />
                  <span className="text-blue-400">author</span>: Your Valentine
                </div>
                <div className="flex space-x-2">
                   <HeartIcon size={20} className="text-pink-500 animate-pulse" />
                   <code className="text-pink-500 font-bold">0xFFFF</code>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retro scanlines and noise effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
    </div>
  );
};

export default App;
