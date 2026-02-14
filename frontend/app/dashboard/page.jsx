'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  PlusCircle, Loader2, Sparkles, LayoutDashboard, 
  ArrowLeft, Leaf, RefreshCw, Copy, UserCheck, TrendingUp, Globe, Activity 
} from 'lucide-react';

// Components
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import DataCollectionForm from '@/components/DataCollectionForm';
import UpdateResourcesForm from '@/components/dashboard/UpdateResourcesForm';
import ActionPlanDisplay from '@/components/ActionPlanDisplay';
import PersonalReport from '@/components/dashboard/PersonalReport';

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
  const { userData, refreshUserData, loading: authLoading } = useAuth();
  const [viewState, setViewState] = useState('loading'); 
  const [currentDashboardView, setCurrentDashboardView] = useState('dashboard');
  const [isUpdating, setIsUpdating] = useState(false);

  // Mocked Stats for the UI - In a real app, these would come from userData.stats logic
  const stats = [
    { label: 'Community Score', value: '85', trend: '+12%', status: 'up' },
    { label: 'Active Members', value: '124', trend: '+5 new', status: 'up' },
    { label: 'Carbon Offset', value: '12T', trend: 'Stable', status: 'neutral' },
  ];

  useEffect(() => {
    if (!authLoading) {
      setViewState(userData?.communityId ? 'dashboard' : 'onboarding');
    }
  }, [userData, authLoading]);

  const handleUpdateAnalysis = async (formData) => {
    setIsUpdating(true);
    try {
      const communityId = userData.communityId;
      const communityRef = doc(db, 'communities', communityId);
      
      await updateDoc(communityRef, {
        stats: formData,
        lastUpdated: serverTimestamp()
      });

      const planRef = collection(db, 'communities', communityId, 'plans');
      await addDoc(planRef, {
        content: MOCK_PLAN_RESPONSE, 
        title: `Updated Roadmap (${new Date().toLocaleDateString()})`,
        createdAt: serverTimestamp()
      });

      await refreshUserData();
      setCurrentDashboardView('dashboard');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Check console.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || viewState === 'loading' || isUpdating) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#080e0d]">
        <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
        <p className="text-zinc-500 text-sm font-medium animate-pulse">
            {isUpdating ? "Updating Community Resources..." : "Syncing with Global Grid..."}
        </p>
      </div>
    );
  }

  // Handle Onboarding logic (Leader vs Citizen) if no community exists
  if (viewState === 'onboarding') {
    // ... Onboarding UI (omitted for brevity, remains as before)
  }

  return (
    <div className="flex min-h-screen bg-[#080e0d] text-zinc-300 font-sans selection:bg-green-500/30">
      <Sidebar currentView={currentDashboardView} setView={setCurrentDashboardView} />
      
      <main className="ml-64 flex-1 p-8 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* VIEW: RE-ANALYZE */}
          {currentDashboardView === 'reanalyze' && (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
               <button onClick={() => setCurrentDashboardView('dashboard')} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors group">
                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                 <span className="text-sm font-bold uppercase tracking-widest">Back to Overview</span>
               </button>
               <UpdateResourcesForm onSubmit={handleUpdateAnalysis} initialData={userData?.stats} />
            </div>
          )}

          {/* VIEW: PERSONAL REPORT */}
          {currentDashboardView === 'personal_report' && <PersonalReport />}

          {/* VIEW: OVERVIEW */}
          {currentDashboardView === 'dashboard' && (
            <div className="animate-in fade-in duration-500">
              <header className="flex justify-between items-center mb-10">
                <div>
                  <div className="flex items-center gap-2 text-green-500 mb-1">
                    <LayoutDashboard size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Overview</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    {userData?.communityName || 'Community Dashboard'}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                     <span className="text-zinc-500 text-sm">ID: <span className="font-mono text-zinc-300">{userData?.communityId}</span></span>
                     <button onClick={() => navigator.clipboard.writeText(userData?.communityId)} className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors">
                        <Copy size={12} />
                     </button>
                  </div>
                </div>

                {userData?.role === 'leader' && (
                    <button 
                        onClick={() => setCurrentDashboardView('reanalyze')}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 group"
                    >
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        New Analysis
                    </button>
                )}
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                 {/* Personal Report Trigger Card */}
                 <div 
                  onClick={() => setCurrentDashboardView('personal_report')} 
                  className="p-6 rounded-[1.5rem] bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 cursor-pointer transition-all group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 blur-xl group-hover:bg-green-500/30 transition-colors" />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                       <div className="p-3 rounded-xl bg-green-500/20 text-green-400"><UserCheck size={20} /></div>
                       <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Access</span>
                    </div>
                    <div className="relative z-10">
                       <h4 className="text-zinc-400 text-xs uppercase tracking-wider font-bold mb-1">My Personal Report</h4>
                       <p className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">View Score →</p>
                    </div>
                </div>

                {stats.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    title={stat.label} 
                    value={stat.value} 
                    trend={stat.trend} 
                    status={stat.status} 
                    index={i} 
                  />
                ))}
              </div>

              {/* Active Community Plans Card */}
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Sparkles size={20} className="text-green-400" />
                    </div>
                    <h2 className="font-bold text-xl text-white">Active Roadmap</h2>
                  </div>
                </div>
                
                {/* Roadmap Content */}
                <div className="p-8">
                   <ActionPlanDisplay 
                     plan={MOCK_PLAN_RESPONSE} 
                     communityData={{ name: userData?.communityName }} 
                   />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}