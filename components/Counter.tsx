
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CounterProps {
  startDate: string;
}

export const Counter: React.FC<CounterProps> = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const start = new Date(startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="font-mono bg-[#0d1117] p-6 rounded-lg border border-[#30363d] shadow-inner">
      <div className="text-[10px] text-green-500 mb-2 opacity-70 uppercase tracking-widest flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        Connection Status: Stable
      </div>
      <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">Our Love System Uptime (Since Nov 1, 2025):</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: 'DD', value: timeLeft.days },
          { label: 'HH', value: timeLeft.hours },
          { label: 'MM', value: timeLeft.minutes },
          { label: 'SS', value: timeLeft.seconds }
        ].map((item, i) => (
          <div key={i} className="bg-[#161b22] p-2 rounded border border-[#30363d]">
            <span className="block text-2xl font-bold text-pink-500">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[9px] text-blue-400 font-mono italic">
        root@heart:~$ tail -f passion.log
      </div>
    </div>
  );
};
