'use client';
import React, { useState } from 'react';
import { Droplets, Zap, Trash2, Send, Users, Bus, Recycle, Flame, ShoppingBag, Leaf, Utensils } from 'lucide-react';

export default function DataCollection({ onDataSubmit }) {
  const [formData, setFormData] = useState({
    householdSize: 1,
    electricity: '', // Raw kWh
    renewable: 0,   // Percentage
    water: '',       // Total Liters/Month
    wastePoints: 0,
    fuelPoints: 0,
    transportPoints: 0,
    plasticPoints: 0,
    foodPoints: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataSubmit(formData);
  };

  const inputStyle = "bg-transparent text-xl font-bold text-white outline-none w-full border-b border-white/10 focus:border-green-500/50 pb-2 transition-colors";
  const labelStyle = "flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-4xl mx-auto p-8 bg-white/[0.02] border border-white/10 rounded-[3rem]">
      
      {/* 1. Household Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
        <div>
          <label className={labelStyle}><Users size={14}/> Household Size</label>
          <input 
            type="number" min="1" required
            className={inputStyle}
            value={formData.householdSize}
            onChange={(e) => setFormData({...formData, householdSize: e.target.value})}
          />
        </div>
        <div>
          <label className={labelStyle}><Zap size={14} className="text-yellow-400"/> Monthly kWh</label>
          <input 
            type="number" required
            className={inputStyle}
            placeholder="Total kWh"
            onChange={(e) => setFormData({...formData, electricity: e.target.value})}
          />
        </div>
        <div>
          <label className={labelStyle}><Droplets size={14} className="text-blue-400"/> Monthly Liters</label>
          <input 
            type="number" required
            className={inputStyle}
            placeholder="Total Liters"
            onChange={(e) => setFormData({...formData, water: e.target.value})}
          />
        </div>
      </div>

      {/* 2. Sliders & Percentage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
        <div className="space-y-4">
          <label className={labelStyle}><Leaf size={14} className="text-green-400"/> Renewable Energy Usage: {formData.renewable}%</label>
          <input 
            type="range" min="0" max="100" 
            className="w-full accent-green-500"
            onChange={(e) => setFormData({...formData, renewable: e.target.value})}
          />
        </div>
        
        {/* 3. Transport (18 pts) */}
        <div className="space-y-4">
          <label className={labelStyle}><Bus size={14} className="text-purple-400"/> Primary Transport Mode</label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
            onChange={(e) => setFormData({...formData, transportPoints: e.target.value})}
          >
            <option value="0" className="bg-zinc-900 text-white">Select Mode</option>
            <option value="18" className="bg-zinc-900 text-white">Walking / Cycling (18 pts)</option>
            <option value="14" className="bg-zinc-900 text-white">Public Transport (14 pts)</option>
            <option value="10" className="bg-zinc-900 text-white">Electric Vehicle (10 pts)</option>
            <option value="6" className="bg-zinc-900 text-white">Hybrid (6 pts)</option>
            <option value="3" className="bg-zinc-900 text-white">Petrol/Diesel Daily (3 pts)</option>
            <option value="0" className="bg-zinc-900 text-white">Heavy Car Dependency (0 pts)</option>
          </select>
        </div>
      </div>

      {/* 4. Categorical Selections (Multi-grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Waste */}
        <div className="p-4 rounded-2xl bg-white/5 space-y-3">
          <label className={labelStyle}><Recycle size={14}/> Waste</label>
          <select className="bg-transparent text-xs text-zinc-300 outline-none w-full" onChange={(e) => setFormData({...formData, wastePoints: e.target.value})}>
            <option value="0" className="bg-zinc-900 text-white">None</option>
            <option value="8" className="bg-zinc-900 text-white">Segregation Only</option>
            <option value="12" className="bg-zinc-900 text-white">Segregation + Compost</option>
          </select>
        </div>

        {/* Plastic */}
        <div className="p-4 rounded-2xl bg-white/5 space-y-3">
          <label className={labelStyle}><ShoppingBag size={14}/> Plastic Use</label>
          <select className="bg-transparent text-xs text-zinc-300 outline-none w-full" onChange={(e) => setFormData({...formData, plasticPoints: e.target.value})}>
            <option value="0" className="bg-zinc-900 text-white">Frequent</option>
            <option value="6" className="bg-zinc-900 text-white">Moderate</option>
            <option value="12" className="bg-zinc-900 text-white">Avoid Single-Use</option>
          </select>
        </div>

        {/* Fuel */}
        <div className="p-4 rounded-2xl bg-white/5 space-y-3">
          <label className={labelStyle}><Flame size={14}/> Cooking Fuel</label>
          <select className="bg-transparent text-xs text-zinc-300 outline-none w-full" onChange={(e) => setFormData({...formData, fuelPoints: e.target.value})}>
            <option value="0" className="bg-zinc-900 text-white">Inefficient</option>
            <option value="4" className="bg-zinc-900 text-white">Efficient LPG</option>
            <option value="6" className="bg-zinc-900 text-white">Induction / Biogas</option>
          </select>
        </div>

        {/* Sustainable Purchasing */}
        <div className="p-4 rounded-2xl bg-white/5 space-y-3">
          <label className={labelStyle}><Leaf size={14}/> Purchasing</label>
          <select className="bg-transparent text-xs text-zinc-300 outline-none w-full" onChange={(e) => setFormData({...formData, purchasePoints: e.target.value})}>
            <option value="0" className="bg-zinc-900 text-white">Rarely Eco-friendly</option>
            <option value="3" className="bg-zinc-900 text-white">Sometimes</option>
            <option value="5" className="bg-zinc-900 text-white">Always Eco-friendly</option>
          </select>
        </div>

        {/* Food Waste */}
        <div className="p-4 rounded-2xl bg-white/5 space-y-3">
          <label className={labelStyle}><Utensils size={14}/> Food Waste</label>
          <select className="bg-transparent text-xs text-zinc-300 outline-none w-full" onChange={(e) => setFormData({...formData, foodPoints: e.target.value})}>
            <option value="0" className="bg-zinc-900 text-white">High</option>
            <option value="3" className="bg-zinc-900 text-white">Moderate</option>
            <option value="5" className="bg-zinc-900 text-white">Minimal</option>
          </select>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full py-5 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl transition-all flex items-center justify-center gap-2 mt-8 shadow-[0_20px_40px_rgba(34,197,94,0.2)]"
      >
        Calculate Environmental Score <Send size={18} />
      </button>
    </form>
  );
}