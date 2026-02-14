'use client';
const response ={
  "summary": "Emerald Valley is well-positioned to become a regional leader in sustainability. By leveraging your moderate population density and existing partial renewable infrastructure, this plan focuses on 'closing the loop' in waste management and optimizing public transit to reduce carbon-heavy commuting by 35% over the next two years.",
  "actionItems": [
    {
      "name": "Community Micro-Grid Expansion",
      "description": "Install additional solar arrays on municipal buildings to create a resilient energy buffer during peak hours.",
      "timeline": "8 - 12 Months",
      "cost": "$250k - $400k",
      "impact": "High (Energy Independence)"
    },
    {
      "name": "Smart-Sensor Waste Program",
      "description": "Deploy IoT sensors in public waste bins to optimize collection routes, reducing fuel consumption of municipal trucks.",
      "timeline": "3 - 5 Months",
      "cost": "$45k - $60k",
      "impact": "Medium (Operational Efficiency)"
    },
    {
      "name": "Native Reforestation Corridor",
      "description": "Establish a 5-mile green belt using native oak and maple species to improve air quality and local biodiversity.",
      "timeline": "24 Months (Ongoing)",
      "cost": "$15k - $30k",
      "impact": "High (Ecosystem Health)"
    }
  ],
  "expectedOutcomes": [
    "35% reduction in municipal grid dependence",
    "Estimated 120 tons of CO2 offset annually",
    "Significant increase in local pollinator populations",
    "Lowered maintenance costs for waste management"
  ],
  "resourceRequirements": "Requires partnership with local utility providers for grid-tie-ins, a volunteer core of 50 residents for planting days, and an initial grant for IoT sensor procurement."
}

import { useState } from 'react';
import DataCollectionForm from '@/components/DataCollectionForm';
import ActionPlanDisplay from '@/components/ActionPlanDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState('form');
  const [communityData, setCommunityData] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);

  // const handleFormSubmit = async (data) => {
  //   setCommunityData(data);
  //   setCurrentView('loading');

  //   try {
  //     const response = await fetch('http://localhost:5000/api/plans/generate', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) throw new Error('Failed to generate action plan');

  //     const result = await response.json();
  //     setActionPlan(result);
  //     setCurrentView('results');
  //   } catch (error) {
  //     console.error('Error generating action plan:', error);
  //     alert('Failed to generate action plan. Please ensure the backend server is running.');
  //     setCurrentView('form');
  //   }
  // };
  const handleFormSubmit = async (data) => {
  setCommunityData(data);
  setCurrentView('loading');

  // Simulate API delay
  setTimeout(() => {
    const mockData = { /* Paste the JSON above here */ };
    setActionPlan(response);
    setCurrentView('results');
  }, 5000); // 5 seconds to appreciate the loading animations
  };

  const handleStartOver = () => {
    setCurrentView('form');
    setCommunityData(null);
    setActionPlan(null);
  };

  return (
    // Updated Background: Deep Emerald/Cyan theme for EcoMindAI
    <div className="min-h-screen bg-[#050b0a] text-zinc-100 selection:bg-green-500/30 relative overflow-hidden font-sans">
      
      {/* --- Ambient Glass Background Glows --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header: Floated Glass Card */}
      <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4">
        <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-cyan-300">
                EcoMindAI
              </h1>
              <p className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
                Community Environmental Action Planner
              </p>
            </div>
          </div>

          {currentView === 'results' && (
            <button 
              onClick={handleStartOver} 
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-5xl mx-auto pt-20 pb-20 px-4 relative z-10">
        {currentView === 'form' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Create Your Community <br/><span className="text-green-400">Action Plan</span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                Share details about your community. Our AI generates a personalized 
                environmental plan tailored to your unique resources.
              </p>
            </div>

            {/* Form Container: Glassmorphic Box */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
              <DataCollectionForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        {currentView === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
            <LoadingSpinner />
            <p className="mt-6 text-zinc-500 tracking-widest text-xs uppercase">Analyzing Ecosystem Data...</p>
          </div>
        )}

        {currentView === 'results' && actionPlan && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <ActionPlanDisplay plan={actionPlan} communityData={communityData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10 border-t border-white/5 mx-auto max-w-4xl">
        <p className="text-xs tracking-widest text-zinc-600 uppercase">
          © 2026 EcoMindAI | Architectured by API Team
        </p>
      </footer>
    </div>
  );
}