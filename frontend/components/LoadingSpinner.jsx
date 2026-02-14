'use client';

import { useEffect, useState } from 'react';
import { Sprout, Loader2, Sparkles } from 'lucide-react';

const loadingMessages = [
  'Analyzing community data...',
  'Consulting environmental best practices...',
  'Tailoring recommendations...',
  'Calculating resource requirements...',
  'Generating your action plan...',
];

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Background Ambient Glow for the Spinner */}
      <div className="absolute w-64 h-64 bg-green-500/20 rounded-full blur-[100px] animate-pulse" />

      <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 p-12 rounded-[3rem] text-center max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative sparkle */}
        <Sparkles className="absolute top-4 right-4 text-green-500/20 w-8 h-8" />

        {/* Animated Icon Container */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Multi-layered pulse rings */}
            <div className="w-20 h-20 rounded-full border border-green-500/30 animate-ping" />
            <div className="w-28 h-28 absolute rounded-full bg-gradient-to-br from-green-400 to-cyan-500 opacity-10 blur-xl" />
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
              <Sprout className="w-12 h-12 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Cultivating Strategy
          </h3>
          
          <div className="h-6 flex items-center justify-center">
            <p className="text-zinc-400 text-sm font-light animate-in fade-in slide-in-from-bottom-2 duration-500 transition-all" key={messageIndex}>
              {loadingMessages[messageIndex]}
            </p>
          </div>
        </div>

        {/* Modern Progress Rail */}
        <div className="mt-10">
          <div className="flex justify-center items-center gap-3">
            {loadingMessages.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-700 rounded-full ${
                  i === messageIndex 
                  ? 'w-8 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' 
                  : 'w-1.5 h-1.5 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Spinning Ring */}
        <div className="absolute bottom-0 left-0 w-full h-1">
          <div className="h-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}