'use client';
import React, { useState } from 'react';
import { Droplets, Zap, Trash2, Send } from 'lucide-react';

export default function DataCollection({ onDataSubmit }) {
  const [formData, setFormData] = useState({
    water: '',
    energy: '',
    waste: 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
      <div className="grid gap-4">
        {/* Water Input */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 focus-within:border-blue-500/50 transition-all">
          <label className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase mb-4">
            <Droplets size={14} className="text-blue-400" /> Monthly Water (Gallons)
          </label>
          <input 
            type="number" 
            required
            className="bg-transparent text-2xl font-black text-white outline-none w-full"
            placeholder="0.00"
            value={formData.water}
            onChange={(e) => setFormData({...formData, water: e.target.value})}
          />
        </div>

        {/* Energy Input */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 focus-within:border-yellow-500/50 transition-all">
          <label className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase mb-4">
            <Zap size={14} className="text-yellow-400" /> Energy Usage (kWh)
          </label>
          <input 
            type="number" 
            required
            className="bg-transparent text-2xl font-black text-white outline-none w-full"
            placeholder="0.00"
            value={formData.energy}
            onChange={(e) => setFormData({...formData, energy: e.target.value})}
          />
        </div>

        {/* Waste Slider */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <label className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-4">
            <span className="flex items-center gap-2"><Trash2 size={14} className="text-emerald-400" /> Waste Recycled</span>
            <span className="text-white">{formData.waste}%</span>
          </label>
          <input 
            type="range" 
            min="0" max="100"
            className="w-full accent-emerald-500 cursor-pointer"
            value={formData.waste}
            onChange={(e) => setFormData({...formData, waste: e.target.value})}
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full py-5 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(34,197,94,0.2)] flex items-center justify-center gap-2"
      >
        Submit Usage Data <Send size={18} />
      </button>
    </form>
  );
}