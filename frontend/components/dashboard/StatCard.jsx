'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, trend, status, index }) {
  // Determine color and glow based on status
  const getTrendIcon = () => {
    if (status === 'up') return <TrendingUp size={14} className="text-green-400" />;
    if (status === 'down') return <TrendingDown size={14} className="text-red-400" />;
    return <Minus size={14} className="text-zinc-500" />;
  };

  const getTrendStyles = () => {
    if (status === 'up') return "text-green-400 bg-green-500/10 border-green-500/20";
    if (status === 'down') return "text-red-400 bg-red-500/10 border-red-500/20";
    return "text-zinc-500 bg-white/5 border-white/10";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group overflow-hidden backdrop-blur-xl bg-white/[0.03] p-6 rounded-[2rem] border border-white/10 shadow-2xl"
    >
      {/* Decorative Corner Glow */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 blur-3xl rounded-full transition-opacity duration-500 opacity-20 group-hover:opacity-40 
        ${status === 'up' ? 'bg-green-500' : status === 'down' ? 'bg-red-500' : 'bg-cyan-500'}`} 
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
          {title}
        </h3>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${getTrendStyles()}`}>
          {getTrendIcon()}
          {trend}
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-3xl font-bold text-white tracking-tight mb-1">
          {value}
        </p>
        <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-50" />
      </div>
    </motion.div>
  );
}