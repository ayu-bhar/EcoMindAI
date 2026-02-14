'use client';

import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Leaf, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const { logout, userData } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    // Only show "My Plans" if relevant, or keep it as placeholder
    { icon: FileText, label: "Reports", active: false }, 
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
        
        {/* User Role Badge */}
        <div className="mt-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 inline-flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${userData?.role === 'leader' ? 'bg-purple-500' : 'bg-green-500'}`} />
           <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{userData?.role || 'User'}</span>
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