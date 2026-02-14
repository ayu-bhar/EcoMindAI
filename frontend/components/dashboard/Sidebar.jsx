import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: FileText, label: "My Plans", active: false },
    { icon: Leaf, label: "Resources", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <Leaf className="fill-current" />
          <span>EcoMindAI</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              item.active 
                ? "bg-emerald-50 text-emerald-700" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}