'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { PlusCircle, Loader2, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const { loading, stats, plans, user } = useDashboardData();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#080e0d]">
        <div className="relative flex items-center justify-center mb-4">
            <div className="absolute w-16 h-16 bg-green-500/20 rounded-full animate-ping" />
            <Loader2 className="w-10 h-10 animate-spin text-green-500 relative z-10" />
        </div>
        <p className="text-zinc-500 text-sm font-medium animate-pulse">Syncing ecosystem data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080e0d] text-zinc-300 font-sans selection:bg-green-500/30">
      {/* SIDEBAR - Ensure your Sidebar component uses bg-black/20 or similar */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-8 relative">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 text-green-500 mb-1">
                <LayoutDashboard size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Overview</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
              <p className="text-zinc-500 text-sm">Welcome back, <span className="text-zinc-300 font-medium">{user?.name}</span></p>
            </div>
            
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-green-500/10 group">
              <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
              New Analysis
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} index={i} />
            ))}
          </div>

          {/* Recent Plans Table Card */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Sparkles size={20} className="text-green-400" />
                </div>
                <h2 className="font-bold text-xl text-white">Active Sustainability Plans</h2>
              </div>
              <button className="text-xs font-bold text-green-500 uppercase tracking-widest hover:text-green-400 transition-colors">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-8 py-5">Plan Title</th>
                    <th className="px-8 py-5">Priority</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5 font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">
                        {plan.title}
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border
                          ${plan.priority === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 
                            plan.priority === 'Medium' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 
                            'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'}`}>
                          {plan.priority}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2.5 text-zinc-400">
                          <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] 
                            ${plan.status === 'Completed' ? 'bg-green-500 shadow-green-500/50' : 
                              plan.status === 'In Progress' ? 'bg-cyan-500 shadow-cyan-500/50' : 
                              'bg-zinc-600 shadow-transparent'}`} 
                          />
                          {plan.status}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-zinc-500 font-mono text-xs italic">{plan.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}