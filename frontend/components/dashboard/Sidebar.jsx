'use client';

import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Leaf, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Sidebar() {
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: FileText, label: "My Plans", active: false },
    { icon: Leaf, label: "Resources", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-64 backdrop-blur-2xl bg-black/20 border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Leaf className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white italic">EcoMind<span className="text-green-400 not-italic">AI</span></span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
              item.active 
                ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)]" 
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            <item.icon 
              size={18} 
              className={`${item.active ? "text-green-400" : "text-zinc-500 group-hover:text-zinc-200"}`} 
            />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Upgrade/CTA Section - Premium Touch */}
      <div className="px-6 mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group">
          <Sparkles className="absolute -right-2 -top-2 w-12 h-12 text-green-500/10 group-hover:rotate-12 transition-transform" />
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Pro Access</p>
          <p className="text-xs text-zinc-400 mb-3 leading-tight">Unlock advanced AI ecosystem modeling.</p>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold rounded-lg border border-white/10 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="p-6 border-t border-white/5">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl text-sm font-medium transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}