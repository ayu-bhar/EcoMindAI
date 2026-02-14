'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar'; // Ensure correct path
import StatCard from '@/components/dashboard/StatCard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function Dashboard() {
  // 1. USE THE HOOK
  const { loading, stats, plans, user } = useDashboardData();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* 2. SIDEBAR */}
      <Sidebar />

      {/* 3. MAIN CONTENT */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome back, {user?.name}</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition">
            <PlusCircle size={18} />
            New Analysis
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>

        {/* Recent Plans Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-slate-800">Active Sustainability Plans</h2>
            <button className="text-sm text-emerald-600 font-medium hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold">
                <tr>
                  <th className="px-6 py-4">Plan Title</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{plan.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${plan.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                          plan.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : 
                          'bg-slate-100 text-slate-700'}`}>
                        {plan.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full 
                          ${plan.status === 'Completed' ? 'bg-emerald-500' : 
                            plan.status === 'In Progress' ? 'bg-blue-500' : 
                            'bg-slate-300'}`} 
                        />
                        {plan.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{plan.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}