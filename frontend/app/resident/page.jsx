'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, LayoutDashboard, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SustainabilityScore from '@/components/resident/SustainabilityScore';
import ActionTips from '@/components/resident/ActionTips';
import DataCollection from '@/components/resident/DataCollection';
const MOCK_AI_DATA = {
  summary: "Your primary strength lies in your commute (18/18 for transport), but your waste management and plastic habits are currently your largest areas for improvement.",
  actionPlan: [
    {
      name: "Zero-Waste Transition",
      description: "Moving from basic segregation (8 pts) to composting (12 pts) will significantly boost your waste score.",
      timeline: "2 Weeks",
      cost: "$20 (Compost Bin)",
      impact: "High",
      type: "waste"
    },
    {
      name: "Plastic Usage Audit",
      description: "By swapping single-use bottles for a high-quality filter, you can move your Plastic Usage from Moderate to Eco-Leader status.",
      timeline: "Immediate",
      cost: "$30",
      impact: "Medium",
      type: "waste"
    }
  ],
  resourceRequirements: "Requires a local composting guide and a one-time investment in reusable containers."
};

const MOCK_ANALYSIS = {
  sustainabilityScore: 72,
  summary: "Initial assessment based on community averages. Please recalibrate with your specific household data.",
  actionItems: [
    {
      name: "Update Your Profile",
      description: "Complete your first audit to see personalized impact tips.",
      timeline: "5 Minutes",
      cost: "$0",
      impact: "High",
      type: "energy"
    }
  ]
};
const calculateResidentScore = (data) => {
  let s = 0;
  // Household normalization
  const perPersonElec = Number(data.electricity) / (Number(data.householdSize) || 1);
  const perPersonWater = (Number(data.water) / (Number(data.householdSize) || 1)) / 30;

  // 1. Electricity (18 pts)
  if (perPersonElec < 90) s += 18;
  else if (perPersonElec <= 150) s += 12;
  else if (perPersonElec <= 250) s += 6;

  // 2. Renewable (12 pts)
  const ren = Number(data.renewable);
  if (ren >= 70) s += 12;
  else if (ren >= 30) s += 8;
  else if (ren >= 1) s += 3;

  // 3. Water (12 pts)
  if (perPersonWater < 120) s += 12;
  else if (perPersonWater <= 180) s += 8;
  else if (perPersonWater <= 250) s += 4;

  // 4-9. Direct Point Categories
  s += (Number(data.wastePoints) || 0);
  s += (Number(data.fuelPoints) || 0);
  s += (Number(data.transportPoints) || 0);
  s += (Number(data.plasticPoints) || 0);
  s += (Number(data.purchasePoints) || 0);
  s += (Number(data.foodPoints) || 0);

  return Math.min(100, s);
};

export default function ResidentPortal() {
  const [analysisResult, setAnalysisResult] = useState(MOCK_ANALYSIS);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 100-Point Rubric Logic
  const calculateScore = (data) => {
    let s = 0;
    const perPersonElec = Number(data.electricity) / (Number(data.householdSize) || 1);
    const perPersonWater = Number(data.water) / (Number(data.householdSize) || 1) / 30; // monthly to daily

    // 1. Electricity (18)
    if (perPersonElec < 90) s += 18;
    else if (perPersonElec <= 150) s += 12;
    else if (perPersonElec <= 250) s += 6;

    // 2. Renewable (12)
    const ren = Number(data.renewable);
    if (ren >= 70) s += 12;
    else if (ren >= 30) s += 8;
    else if (ren >= 1) s += 3;

    // 3. Water (12)
    if (perPersonWater < 120) s += 12;
    else if (perPersonWater <= 180) s += 8;
    else if (perPersonWater <= 250) s += 4;

    // 4. Waste (12), 5. Fuel (6), 6. Transport (18), 7. Plastic (12), 8. Purchase (5), 9. Food (5)
    // Values are passed as points from the form selections
    s += (Number(data.wastePoints) || 0);
    s += (Number(data.fuelPoints) || 0);
    s += (Number(data.transportPoints) || 0);
    s += (Number(data.plasticPoints) || 0);
    s += (Number(data.purchasePoints) || 0);
    s += (Number(data.foodPoints) || 0);

    return Math.min(100, s);
  };

  const handleDataSubmit = async (formData) => {
  setIsProcessing(true);

  // 1. Calculate Score in Frontend ONLY
  const finalLocalScore = calculateResidentScore(formData);

  // 2. Prepare the Firebase Payload
  const auditPayload = {
    metadata: {
      timestamp: serverTimestamp(),
      householdSize: Number(formData.householdSize) //
    },
    metrics: {
      electricity: Number(formData.electricity), //
      water: Number(formData.water), //
      renewable: Number(formData.renewable), //
      transportPoints: Number(formData.transportPoints), //
      wastePoints: Number(formData.wastePoints), //
      plasticPoints: Number(formData.plasticPoints), //
      fuelPoints: Number(formData.fuelPoints), //
      purchasePoints: Number(formData.purchasePoints), //
      foodPoints: Number(formData.foodPoints) //
    },
    results: {
      localScore: finalLocalScore, // The requested frontend-calculated score
      aiSummary: MOCK_AI_DATA.summary,
      actionPlan: MOCK_AI_DATA.actionPlan,
      resourceRequirements: MOCK_AI_DATA.resourceRequirements
    }
  };

  try {
    // 3. Save to Firebase
    const docRef = await addDoc(collection(db, "resident_audits"), auditPayload);
    console.log("Audit saved with ID: ", docRef.id);

    // 4. Update UI state to show the results dashboard
    setAnalysisResult({
      sustainabilityScore: finalLocalScore,
      ...MOCK_AI_DATA
    });
    
    setShowForm(false);
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    alert("Failed to save audit. Check console for details.");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="min-h-screen bg-[#080e0d] text-zinc-300">
      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <header className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-black text-white uppercase italic">Resident Impact</h1>
                </div>
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase">
                  <RotateCcw size={14} /> Recalibrate Data
                </button>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <section className="lg:col-span-5 flex flex-col items-center p-12 bg-white/[0.02] border border-white/10 rounded-[3rem]">
                  {/* Fixed Reference: using analysisResult.sustainabilityScore */}
                  <SustainabilityScore score={analysisResult.sustainabilityScore} />
                </section>
                <section className="lg:col-span-7">
                  <ActionTips data={analysisResult} />
                </section>
              </div>
            </motion.div>
          ) : (
            <motion.div key="audit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DataCollection onDataSubmit={handleDataSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}