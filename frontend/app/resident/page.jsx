'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  LayoutDashboard, 
  Sparkles 
} from 'lucide-react';

import SustainabilityScore from '@/components/resident/SustainabilityScore';
import ActionTips from '@/components/resident/ActionTips';
import DataCollection from '@/components/resident/DataCollection';

// 1. Define the Testing Data (Mock Response)
const MOCK_ANALYSIS = {
  sustainabilityScore: 78,
  summary: "Your household is a 'High Potential Conserver'. While water usage is efficient, energy peaks suggest phantom loads during night hours.",
  actionItems: [
    {
      name: "Vampire Power Mitigation",
      description: "Install smart power strips to eliminate phantom energy loads from your home office.",
      timeline: "Immediate",
      cost: "$30 - $50",
      impact: "Medium (Save $12/mo)",
      type: "energy"
    },
    {
      name: "Enhanced Recycling Sorting",
      description: "Transition to a three-bin system to increase diversion rate from 40% to 75%.",
      timeline: "1 Week",
      cost: "$20 - $40",
      impact: "High (Waste Reduction)",
      type: "waste"
    }
  ]
};

export default function ResidentPortal() {
  // 2. Initialize with the Mock Data instead of null
  const [analysisResult, setAnalysisResult] = useState(MOCK_ANALYSIS);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDataSubmit = async (formData) => {
    setIsProcessing(true);
    // Simulate AI update
    setTimeout(() => {
      // In a real app, the score would change based on formData
      setAnalysisResult({
        ...MOCK_ANALYSIS,
        sustainabilityScore: Math.min(100, Math.floor((formData.waste / 2) + 50))
      });
      setShowForm(false);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080e0d] text-zinc-300">
      <main className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          
          {/* SHOW ANALYSIS (First View) */}
          {!showForm ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <LayoutDashboard size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Analysis Active</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                    Resident <span className="text-zinc-600">Impact</span>
                  </h1>
                </div>
                
                {/* CALIBRATE BUTTON: Switches to Form */}
                <button 
                  onClick={() => setShowForm(true)}
                  className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <RotateCcw size={14} className="group-hover:rotate-[-120deg] transition-transform" />
                  Recalibrate Data
                </button>
              </header>

              {/* Summary Box */}
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <h3 className="text-emerald-400 font-black uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Sparkles size={14} /> AI Analysis Summary
                </h3>
                <p className="text-white text-lg font-medium leading-relaxed tracking-tight">
                  "{analysisResult.summary}"
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <section className="lg:col-span-5 flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/10 rounded-[3rem]">
                  <SustainabilityScore score={analysisResult.sustainabilityScore} />
                </section>

                <section className="lg:col-span-7">
                  <ActionTips data={analysisResult} />
                </section>
              </div>
            </motion.div>
          ) : (
            
            /* SHOW FORM (On Clicking Recalibrate) */
            <motion.div 
              key="audit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Update Usage Data</h1>
                <p className="text-zinc-500">Recalibrate your score with new monthly metrics</p>
              </div>

              {isProcessing ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Processing...</p>
                </div>
              ) : (
                <>
                  <DataCollection onDataSubmit={handleDataSubmit} />
                  <button 
                    onClick={() => setShowForm(false)}
                    className="mt-6 text-zinc-600 hover:text-white text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel Update
                  </button>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}