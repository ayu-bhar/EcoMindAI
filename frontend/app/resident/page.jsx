'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Zap, 
  Trash2, 
  Send, 
  RotateCcw, 
  LayoutDashboard, 
  Sparkles 
} from 'lucide-react';

// Import the sub-components we built earlier
import SustainabilityScore from '@/components/resident/SustainabilityScore';
import ActionTips from '@/components/resident/ActionTips';
import DataCollection from '@/components/resident/DataCollection';

export default function ResidentPortal() {
  const [submittedData, setSubmittedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);

  /**
   * Handles the submission of household data.
   * In a production environment, this would send data to your 
   * /backend for anonymization and AI analysis.
   */
  const handleDataSubmit = async (data) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Logic: Calculate a mock score based on data inputs
      // We prioritize waste recycling percentage for this mock logic
      const calculatedScore = Math.min(100, Math.floor((data.waste / 2) + 40));
      
      setScore(calculatedScore);
      setSubmittedData(data);
      setIsProcessing(false);
    }, 1500);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-[#080e0d] text-zinc-300 font-sans selection:bg-green-500/30">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {!submittedData ? (
            /* STAGE 1: DATA COLLECTION AUDIT */
            <motion.div 
              key="audit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[70vh]"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  <Sparkles size={12} /> Resident Onboarding
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter italic uppercase">
                  Household <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Audit</span>
                </h1>
                <p className="text-zinc-500 max-w-md mx-auto">
                  Submit your monthly resource usage to receive a personalized conservation strategy and your Eco-Score.
                </p>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                    AI Analyzing Ecosystem Impact...
                  </p>
                </div>
              ) : (
                <DataCollection onDataSubmit={handleDataSubmit} />
              )}
            </motion.div>
          ) : (
            /* STAGE 2: ANALYTICS DASHBOARD */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <LayoutDashboard size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Personal Intelligence Portal</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                    Impact <span className="text-zinc-600">Analysis</span>
                  </h1>
                </div>
                
                <button 
                  onClick={handleReset}
                  className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <RotateCcw size={14} className="group-hover:rotate-[-120deg] transition-transform" />
                  Recalibrate Data
                </button>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: The Score Gauge */}
                <section className="lg:col-span-5">
                  <div className="h-full bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <SustainabilityScore score={score} />
                    <div className="mt-10 text-center relative z-10">
                      <h3 className="text-white font-bold text-lg mb-1">Environmental Status</h3>
                      <p className="text-zinc-500 text-sm max-w-[250px]">
                        Your household is performing better than <span className="text-green-400 font-bold">{score - 10}%</span> of comparable urban units.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Right Side: AI Tips & Action Items */}
                <section className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 ml-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Personalized Conservation Plan</h2>
                  </div>
                  <ActionTips data={submittedData} />
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="py-10 text-center border-t border-white/5 relative z-10">
        <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.5em]">
          Powered by EcoMindAI Neural Engine
        </p>
      </footer>
    </div>
  );
}