'use client';

import { CheckCircle, Clock, DollarSign, Target, Download, MapPin, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function ActionPlanDisplay({ plan, communityData }) {
  const handleDownload = () => {
    const content = `
EcoMindAI Action Plan
Community: ${communityData.name}
Location: ${communityData.location}
Generated: ${new Date().toLocaleDateString()}

${plan.summary}

Action Items:
${plan.actionItems.map((item, i) => `
${i + 1}. ${item.name}
   Timeline: ${item.timeline}
   Cost: ${item.cost}
   Impact: ${item.impact}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${communityData.name.replace(/\s/g, '_')}_plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Header Card */}
      <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-green-400" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> AI-Generated Strategy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">Action Plan</span>
            </h2>
            <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-zinc-600" /> {communityData.location}</span>
              <span className="flex items-center gap-2"><Users size={16} className="text-zinc-600" /> {communityData.population.toLocaleString()} Residents</span>
            </div>
          </div>
          
          <button 
            onClick={handleDownload} 
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-semibold text-white active:scale-95"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* Summary Block */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
          <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-2">Executive Summary</h3>
          <p className="text-zinc-300 leading-relaxed font-light">{plan.summary}</p>
        </div>
      </div>

      {/* Action Items Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3 ml-2">
          <Target className="text-green-500" /> Prioritized Strategic Steps
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {plan.actionItems.map((item, index) => (
            <div key={index} className="group backdrop-blur-md bg-white/[0.01] border border-white/5 hover:border-white/20 rounded-3xl p-6 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white font-mono text-xl group-hover:border-green-500/50 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">{item.name}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <Clock className="text-cyan-500" size={18} />
                      <div>
                        <p className="text-[10px] uppercase text-zinc-500 font-bold">Timeline</p>
                        <p className="text-sm text-zinc-200">{item.timeline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <DollarSign className="text-green-500" size={18} />
                      <div>
                        <p className="text-[10px] uppercase text-zinc-500 font-bold">Budget</p>
                        <p className="text-sm text-zinc-200">{item.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <TrendingUp className="text-purple-500" size={18} />
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

      {/* Footer CTA */}
      <div className="relative rounded-[2.5rem] p-10 overflow-hidden text-center shadow-2xl shadow-green-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 opacity-90" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-black mb-4">Launch Implementation</h3>
          <p className="text-black/70 max-w-xl mx-auto mb-8 font-medium">
            Present this data to community stakeholders. Small actions lead to global change.
          </p>
          <button onClick={handleDownload} className="px-8 py-4 rounded-2xl bg-black text-white font-bold hover:scale-105 transition-transform shadow-xl">
            Get the Full Report
          </button>
        </div>
      </div>
    </div>
  );
}