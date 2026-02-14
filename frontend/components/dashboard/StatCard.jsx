import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, trend, status, index }) {
  // Determine color based on status
  const getTrendIcon = () => {
    if (status === 'up') return <TrendingUp size={16} className="text-emerald-500" />;
    if (status === 'down') return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-slate-400" />;
  };

  const getTrendColor = () => {
    if (status === 'up') return "text-emerald-600 bg-emerald-50";
    if (status === 'down') return "text-red-600 bg-red-50";
    return "text-slate-600 bg-slate-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}>
          {getTrendIcon()}
          {trend}
        </span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </motion.div>
  );
}