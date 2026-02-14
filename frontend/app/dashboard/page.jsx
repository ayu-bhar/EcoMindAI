'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, Loader2, Sparkles, LayoutDashboard, 
  ArrowLeft, Leaf, TrendingUp, Activity, Globe, Users, Shield, Copy 
} from 'lucide-react';

// Components
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import DataCollectionForm from '@/components/DataCollectionForm';
import ActionPlanDisplay from '@/components/ActionPlanDisplay';

// Mock Response (Simulating Backend AI)
const MOCK_PLAN_RESPONSE = {
  summary: "Based on your inputs, your community is ready for immediate solar integration.",
  actionItems: [
    { name: "Solar Grid Setup", description: "Install panels on municipal buildings.", timeline: "6 Months", cost: "$120k", impact: "High" },
    { name: "Waste Reduction", description: "Implement IoT sensors in bins.", timeline: "2 Months", cost: "$15k", impact: "Medium" }
  ],
  expectedOutcomes: ["20% Energy Savings", "Reduced Carbon Footprint"],
  resourceRequirements: "Local Government Approval, 20 Volunteers"
};

export default function Dashboard() {
  const { user, userData, createCommunity, joinCommunity, loading: authLoading } = useAuth();
  const [viewState, setViewState] = useState('loading'); // 'loading', 'onboarding', 'dashboard'
  const [dashboardData, setDashboardData] = useState(null);
  const [joinId, setJoinId] = useState('');
  const [joinError, setJoinError] = useState('');

  // 1. Determine Initial View based on Community Status
  useEffect(() => {
    if (!authLoading) {
      if (userData?.communityId) {
        setViewState('dashboard');
        // In a real app, you would fetch the community data here using the ID
        // For now, we simulate loaded data
        setDashboardData({
          stats: [
            { label: 'Community Score', value: '85', trend: '+12%', status: 'up' },
            { label: 'Active Members', value: '124', trend: '+5 new', status: 'up' },
            { label: 'Carbon Offset', value: '12T', trend: 'Stable', status: 'neutral' },
            { label: 'Next Goal', value: 'Solar', trend: 'Pending', status: 'down' },
          ],
          plans: [{ 
            id: 1, title: 'Initial Sustainability Roadmap', priority: 'High', status: 'Active', date: '2026-02-14',
            content: MOCK_PLAN_RESPONSE, communityData: { name: 'My Community' }
          }]
        });
      } else {
        setViewState('onboarding');
      }
    }
  }, [userData, authLoading]);

  // 2. Handle Leader Creating Community
  const handleCreateSubmit = async (formData) => {
    setViewState('loading');
    // Simulate Backend Delay
    setTimeout(async () => {
      try {
        await createCommunity(formData, MOCK_PLAN_RESPONSE);
        setViewState('dashboard');
      } catch (err) {
        console.error(err);
        setViewState('onboarding');
      }
    }, 2000);
  };

  // 3. Handle Citizen Joining Community
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setJoinError('');
    if (!joinId.trim()) return;

    setViewState('loading');
    try {
      await joinCommunity(joinId);
      setViewState('dashboard');
    } catch (err) {
      setJoinError('Invalid Community ID. Please check with your leader.');
      setViewState('onboarding');
    }
  };

  // --- Views ---

  if (authLoading || viewState === 'loading') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#080e0d]">
        <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
        <p className="text-zinc-500 text-sm font-medium animate-pulse">Syncing with the Global Grid...</p>
      </div>
    );
  }

  // --- ONBOARDING VIEW (No Community Linked) ---
  if (viewState === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#080e0d] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl w-full relative z-10">
          
          {/* LEADER: Create Form */}
          {userData?.role === 'leader' ? (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
               <div className="text-center mb-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Shield size={14} /> Leader Access Granted
                 </div>
                 <h1 className="text-4xl font-bold text-white mb-4">Register Your Community</h1>
                 <p className="text-zinc-400 max-w-xl mx-auto">
                   Initialize your community's digital twin. Once created, you will receive a unique ID to share with your citizens.
                 </p>
               </div>
               <DataCollectionForm onSubmit={handleCreateSubmit} />
            </div>
          ) : (
            /* CITIZEN: Join Form */
            <div className="max-w-md mx-auto text-center animate-in slide-in-from-bottom-8 duration-700">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                   <Users className="text-black w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Join a Community</h1>
                <p className="text-zinc-500 text-sm mb-8">
                  Enter the unique Community ID provided by your local leader to access the dashboard.
                </p>

                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter ID (e.g., ECO-9X2)"
                      value={joinId}
                      onChange={(e) => setJoinId(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-center text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono tracking-widest uppercase"
                    />
                  </div>
                  {joinError && <p className="text-red-400 text-xs font-bold">{joinError}</p>}
                  
                  <button type="submit" className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
                    Access Dashboard <ArrowLeft className="rotate-180 w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW (Community Linked) ---
  return (
    <div className="flex min-h-screen bg-[#080e0d] text-zinc-300 font-sans selection:bg-green-500/30">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 relative">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 text-green-500 mb-1">
                <LayoutDashboard size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Overview</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Community Dashboard</h1>
              <div className="flex items-center gap-2 mt-2">
                 <span className="text-zinc-500 text-sm">ID: <span className="font-mono text-zinc-300">{userData?.communityId}</span></span>
                 {/* Quick Copy Button */}
                 <button onClick={() => navigator.clipboard.writeText(userData?.communityId)} className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors">
                    <Copy size={12} />
                 </button>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardData?.stats.map((stat, i) => (
              <StatCard key={i} title={stat.label} value={stat.value} trend={stat.trend} status={stat.status} index={i} />
            ))}
          </div>

          {/* Active Plans */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Sparkles size={20} className="text-green-400" />
                </div>
                <h2 className="font-bold text-xl text-white">Active Roadmap</h2>
              </div>
              {/* Only Leaders can add new plans */}
              {userData?.role === 'leader' && (
                 <button className="text-xs font-bold text-green-400 border border-green-500/20 bg-green-500/10 px-4 py-2 rounded-lg hover:bg-green-500/20 transition-all flex items-center gap-2">
                    <PlusCircle size={14} /> Update Plan
                 </button>
              )}
            </div>
            
            {/* Display the First Plan Inline */}
            <div className="p-8">
               <ActionPlanDisplay plan={dashboardData?.plans[0].content} communityData={dashboardData?.plans[0].communityData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}