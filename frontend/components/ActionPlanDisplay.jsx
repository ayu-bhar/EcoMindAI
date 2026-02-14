'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { EcoPlanPDF } from './EcoPlanPDF';
import { 
  Download, 
  MapPin, 
  Users, 
  Target, 
  Sparkles, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Loader2,
  FileCheck
} from 'lucide-react';

export default function ActionPlanDisplay({ plan, communityData }) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700 pb-32 pt-10">
      
      {/* 1. Header Hero */}
      <section className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={14} /> Analysis Complete
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Your Community <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            Evolution Strategy
          </span>
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-zinc-400">
            <MapPin size={18} className="text-green-500" /> {communityData.location}
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-zinc-400">
            <Users size={18} className="text-cyan-500" /> {communityData.population.toLocaleString()} Residents
          </div>
        </div>
      </section>

      {/* 2. Executive Summary Glass Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
        <div className="relative backdrop-blur-2xl bg-black/40 border border-white/10 p-8 md:p-12 rounded-[2.5rem]">
          <h3 className="text-green-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <FileCheck size={16} /> Strategy Summary
          </h3>
          <p className="text-zinc-200 text-xl md:text-2xl font-light leading-relaxed">
            "{plan.summary}"
          </p>
        </div>
      </div>

      {/* 3. Action Items List */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 ml-2">
          <Target className="text-green-500" />
          <h2 className="text-2xl font-bold text-white">Priority Initiatives</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {plan.actionItems.map((item, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-green-500 font-mono text-2xl font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
                    {item.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-500 mb-1">
                        <Clock size={14} /> <span className="text-[10px] font-bold uppercase tracking-tighter">Timeline</span>
                      </div>
                      <p className="text-zinc-100 font-medium">{item.timeline}</p>
                    </div>
                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-500 mb-1">
                        <DollarSign size={14} /> <span className="text-[10px] font-bold uppercase tracking-tighter">Estimated Budget</span>
                      </div>
                      <p className="text-zinc-100 font-medium">{item.cost}</p>
                    </div>
                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-500 mb-1">
                        <TrendingUp size={14} /> <span className="text-[10px] font-bold uppercase tracking-tighter">Community Impact</span>
                      </div>
                      <p className="text-zinc-100 font-medium">{item.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PDF Download Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <PDFDownloadLink 
          document={<EcoPlanPDF plan={plan} communityData={communityData} />} 
          fileName={`${communityData.name}_ActionPlan.pdf`}
        >
          {({ loading }) => (
            <button 
              disabled={loading}
              className="flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl transition-all active:scale-95 shadow-[0_20px_50px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Preparing Report...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download Strategy PDF
                </>
              )}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}