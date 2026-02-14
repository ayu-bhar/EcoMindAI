import { Zap, Droplets, Leaf, ArrowUpRight } from 'lucide-react';

export default function ActionTips({ data }) {
  // Logic: AI-driven tips based on audit data
  const tips = [
    {
      title: "Optimize Water Flow",
      desc: "Install low-flow aerators on kitchen faucets to save approx. 700 gal/month.",
      impact: "High",
      icon: <Droplets className="text-blue-400" />
    },
    {
      title: "Smart Power Management",
      desc: "Switch to smart power strips to eliminate 'vampire energy' from idle electronics.",
      impact: "Medium",
      icon: <Zap className="text-yellow-400" />
    }
  ];

  return (
    <div className="grid gap-4">
      {tips.map((tip, i) => (
        <div key={i} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-zinc-900 rounded-2xl">{tip.icon}</div>
            <span className="text-[10px] font-bold uppercase py-1 px-3 bg-green-500/10 text-green-400 rounded-full">
              {tip.impact} Impact
            </span>
          </div>
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            {tip.title} <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed">{tip.desc}</p>
        </div>
      ))}
    </div>
  );
}