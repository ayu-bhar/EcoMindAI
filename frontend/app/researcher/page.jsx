// app/researcher/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { processCommunityData } from '@/lib/analyticsUtils';

const MOCK_RESEARCH_DATA = [
  { id: 1, results: { localScore: 88 }, metrics: { transportPoints: 18, wastePoints: 12, plasticPoints: 10, renewable: 70, electricity: 95, water: 110, fuelPoints: 8, purchasePoints: 8, foodPoints: 8 }, metadata: { householdSize: 2 } },
  { id: 2, results: { localScore: 42 }, metrics: { transportPoints: 4, wastePoints: 4, plasticPoints: 2, renewable: 0, electricity: 280, water: 400, fuelPoints: 2, purchasePoints: 2, foodPoints: 2 }, metadata: { householdSize: 4 } },
  { id: 3, results: { localScore: 65 }, metrics: { transportPoints: 14, wastePoints: 8, plasticPoints: 6, renewable: 30, electricity: 150, water: 180, fuelPoints: 4, purchasePoints: 6, foodPoints: 6 }, metadata: { householdSize: 1 } },
  { id: 4, results: { localScore: 71 }, metrics: { transportPoints: 18, wastePoints: 10, plasticPoints: 8, renewable: 50, electricity: 110, water: 140, fuelPoints: 6, purchasePoints: 4, foodPoints: 6 }, metadata: { householdSize: 3 } },
  { id: 5, results: { localScore: 38 }, metrics: { transportPoints: 2, wastePoints: 2, plasticPoints: 2, renewable: 0, electricity: 350, water: 500, fuelPoints: 2, purchasePoints: 2, foodPoints: 2 }, metadata: { householdSize: 5 } },
  { id: 6, results: { localScore: 94 }, metrics: { transportPoints: 18, wastePoints: 12, plasticPoints: 12, renewable: 90, electricity: 70, water: 90, fuelPoints: 10, purchasePoints: 10, foodPoints: 10 }, metadata: { householdSize: 2 } },
  { id: 7, results: { localScore: 55 }, metrics: { transportPoints: 10, wastePoints: 6, plasticPoints: 4, renewable: 20, electricity: 200, water: 250, fuelPoints: 4, purchasePoints: 4, foodPoints: 4 }, metadata: { householdSize: 2 } },
  { id: 8, results: { localScore: 62 }, metrics: { transportPoints: 14, wastePoints: 8, plasticPoints: 6, renewable: 10, electricity: 180, water: 210, fuelPoints: 4, purchasePoints: 4, foodPoints: 4 }, metadata: { householdSize: 3 } },
  { id: 9, results: { localScore: 48 }, metrics: { transportPoints: 6, wastePoints: 4, plasticPoints: 4, renewable: 15, electricity: 240, water: 300, fuelPoints: 4, purchasePoints: 2, foodPoints: 4 }, metadata: { householdSize: 4 } },
  { id: 10, results: { localScore: 77 }, metrics: { transportPoints: 18, wastePoints: 10, plasticPoints: 8, renewable: 60, electricity: 100, water: 130, fuelPoints: 8, purchasePoints: 6, foodPoints: 8 }, metadata: { householdSize: 2 } }
];

export default function ResearcherDashboard() {
  const [data, setData] = useState(MOCK_RESEARCH_DATA);
  const [chartData, setChartData] = useState(processCommunityData(MOCK_RESEARCH_DATA));
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "resident_audits"));
  //       const audits = querySnapshot.docs.map(doc => doc.data());
  //       setData(audits);
  //       setChartData(processCommunityData(audits));
  //     } catch (error) {
  //       console.error("Error fetching researcher data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const avgCommunityScore = data.length 
    ? Math.round(data.reduce((acc, curr) => acc + curr.results.localScore, 0) / data.length) 
    : 0;

  if (loading) return <div className="min-h-screen bg-[#080e0d] flex items-center justify-center text-white font-mono">LOADING COMMUNITY DATA...</div>;

  return (
    <div className="min-h-screen bg-[#080e0d] text-zinc-300 p-8">
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Community <span className="text-emerald-500">Insights</span></h1>
          <p className="text-zinc-500 text-sm mt-2">Aggregated data from {data.length} registered households</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Users className="text-blue-400"/>} label="Total Participants" value={data.length} />
          <StatCard icon={<TrendingUp className="text-emerald-400"/>} label="Avg Community Score" value={`${avgCommunityScore}/100`} />
          <StatCard icon={<AlertTriangle className="text-orange-400"/>} label="Priority Area" value="Waste Mgmt" />
        </div>

        {/* Main Analytics Chart */}
        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10">
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg">Category Performance Analysis</h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Average points earned per rubric category</p>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px'}}
                />
                <Bar dataKey="average" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.average > 10 ? '#10b981' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
      <div className="flex items-center gap-3 mb-4 text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
        {icon} {label}
      </div>
      <div className="text-3xl font-black text-white italic">{value}</div>
    </div>
  );
}