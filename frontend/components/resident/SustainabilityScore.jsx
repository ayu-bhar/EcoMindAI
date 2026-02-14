'use client';
import { motion } from 'framer-motion';

export default function SustainabilityScore({ score = 0 }) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full" />
      
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="144" cy="144" r={radius}
          stroke="currentColor" strokeWidth="12"
          fill="transparent" className="text-white/5"
        />
        <motion.circle
          cx="144" cy="144" r={radius}
          stroke="url(#scoreGradient)" strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round" fill="transparent"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-6xl font-black text-white">{score}</span>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Eco Index</span>
      </div>
    </div>
  );
}