'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Target, 
  Download, 
  MapPin, 
  Users, 
  TrendingUp, 
  Sparkles,
  FileText
} from 'lucide-react';

export default function ActionPlanDisplay({ plan, communityData }) {
  const reportRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#080e0d", // Matches our dark theme
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${communityData.name.replace(/\s/g, '_')}_EcoPlan.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-20">
      
      {/* PDF CAPTURE AREA START */}
      <div 
        ref={reportRef} 
        className="p-8 md:p-12 bg-[#080e0d] rounded-[2.5rem] border border-white/5"
      >
        {/* PDF Brand Header (Only visible in PDF and Desktop) */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Sparkles className="text-black w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">EcoMindAI</h1>
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Sustainability Intelligence</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-zinc-500 text-xs">Report ID: #ECO-{Math.floor(1000 + Math.random() * 9000)}</p>
            <p className="text-zinc-500 text-xs">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">Action Plan</span>
          </h2>
          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <MapPin size={16} className="text-green-500" /> {communityData.location}
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <Users size={16} className="text-cyan-500" /> {communityData.population.toLocaleString()} Residents
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 p-8 rounded-3xl">
            <h3 className="text-sm font-bold text-green-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <FileText size={16} /> Executive Summary
            </h3>
            <p className="text-zinc-300 leading-relaxed text-lg font-light italic">
              "{plan.summary}"
            </p>
          </div>
        </div>

        {/* Action Items Grid */}
        <div className="space-y-6 mb-12">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 ml-2">
            <Target className="text-green-500" /> Core Initiatives
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {plan.actionItems.map((item, index) => (
              <div key={index} className="backdrop-blur-md bg-white/[0.01] border border-white/5 rounded-3xl p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white font-mono text-xl shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{item.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <Clock className="text-cyan-400" size={18} />
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold">Timeline</p>
                          <p className="text-sm text-zinc-200">{item.timeline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <DollarSign className="text-green-400" size={18} />
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold">Budget</p>
                          <p className="text-sm text-zinc-200">{item.cost}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <TrendingUp className="text-purple-400" size={18} />
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold">Impact</p>
                          <p className="text-sm text-zinc-200">{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Expected Outcomes
            </h3>
            <ul className="space-y-4">
              {plan.expectedOutcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-4">Resource Requirements</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              {plan.resourceRequirements}
            </p>
          </div>
        </div>
      </div>
      {/* PDF CAPTURE AREA END */}

      {/* Persistent Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl z-50">
        <p className="text-zinc-400 text-xs font-medium border-r border-white/10 pr-4 mr-2 hidden sm:block">
          Plan ready for {communityData.name}
        </p>
        <button 
          onClick={handleDownloadPDF} 
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-green-500/20"
        >
          <Download size={18} /> 
          Export PDF
        </button>
      </div>

    </div>
  );
}