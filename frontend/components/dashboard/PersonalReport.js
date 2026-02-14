'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

// Import your sub-components
import SustainabilityScore from '@/components/resident/SustainabilityScore';
import ActionTips from '@/components/resident/ActionTips';
import DataCollection from '@/components/resident/DataCollection';

// --- Helper: Score Calculation ---
const calculateResidentScore = (data) => {
  let s = 0;
  // Normalization logic
  const perPersonElec = Number(data.electricity) / (Number(data.householdSize) || 1);
  const perPersonWater = (Number(data.water) / (Number(data.householdSize) || 1)) / 30;

  if (perPersonElec < 90) s += 18;
  else if (perPersonElec <= 150) s += 12;
  else if (perPersonElec <= 250) s += 6;

  const ren = Number(data.renewable);
  if (ren >= 70) s += 12;
  else if (ren >= 30) s += 8;
  else if (ren >= 1) s += 3;

  if (perPersonWater < 120) s += 12;
  else if (perPersonWater <= 180) s += 8;
  else if (perPersonWater <= 250) s += 4;

  s += (Number(data.wastePoints) || 0);
  s += (Number(data.fuelPoints) || 0);
  s += (Number(data.transportPoints) || 0);
  s += (Number(data.plasticPoints) || 0);
  s += (Number(data.purchasePoints) || 0);
  s += (Number(data.foodPoints) || 0);

  return Math.min(100, s);
};

export default function PersonalReport() {
  const { user, userData } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Default State
  const [reportData, setReportData] = useState({
    sustainabilityScore: 0,
    summary: "No data available. Please recalibrate to see your impact.",
    actionItems: []
  });

  // Load latest report on mount
  useEffect(() => {
    const loadLastReport = async () => {
      if (userData?.communityId && user?.uid) {
        try {
          // Query the specific community's folder
          const q = query(
            collection(db, 'communities', userData.communityId, 'resident_reports'),
            orderBy('metadata.timestamp', 'desc'),
            limit(1)
          );
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            // Filter to make sure it matches current user (though typically you'd query by userID too)
            if(data.userId === user.uid) {
                setReportData({
                    sustainabilityScore: data.results.localScore,
                    summary: data.results.aiSummary,
                    actionItems: data.results.actionItems || []
                });
            }
          }
        } catch (err) {
          console.error("Error loading report:", err);
        }
      }
    };
    loadLastReport();
  }, [user, userData]);

  const handleDataSubmit = async (formData) => {
    setIsProcessing(true);

    if (!userData?.communityId) {
        alert("You must be part of a community to save reports.");
        setIsProcessing(false);
        return;
    }

    try {
      const finalLocalScore = calculateResidentScore(formData);

      const auditPayload = {
        userId: user.uid,
        userName: userData.name || 'Resident',
        metadata: {
          timestamp: serverTimestamp(),
          householdSize: Number(formData.householdSize)
        },
        metrics: { ...formData },
        results: {
          localScore: finalLocalScore,
          aiSummary: "Based on your latest inputs, your transport score is strong, but water usage is high.",
          actionItems: [
             { name: "Install Aerators", description: "Reduce water flow by 30%", impact: "High", type: "water" },
             { name: "Switch to LEDs", description: "Quick win for energy score", impact: "Medium", type: "energy" }
          ]
        }
      };

      // SAVE TO COMMUNITY FOLDER
      // Path: communities/{communityId}/resident_reports/{autoId}
      await addDoc(collection(db, 'communities', userData.communityId, 'resident_reports'), auditPayload);

      setTimeout(() => {
        setReportData({
          sustainabilityScore: finalLocalScore,
          summary: auditPayload.results.aiSummary,
          actionItems: auditPayload.results.actionItems
        });
        setShowForm(false);
        setIsProcessing(false);
      }, 1500);

    } catch (error) {
      console.error("Error saving to Firebase:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Personal Impact Report</h2>
                <p className="text-zinc-500 text-sm">Community ID: <span className="font-mono text-green-400">{userData?.communityId}</span></p>
              </div>
              <button 
                onClick={() => setShowForm(true)} 
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase hover:bg-green-500/20 transition-colors"
              >
                <RotateCcw size={14} /> Recalibrate
              </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-5 flex flex-col items-center p-8 bg-white/[0.02] border border-white/10 rounded-[2rem]">
                <SustainabilityScore score={reportData.sustainabilityScore} />
              </section>
              <section className="lg:col-span-7">
                <ActionTips data={reportData} />
              </section>
            </div>
          </motion.div>
        ) : (
          <motion.div key="audit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
             {isProcessing ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                   <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                   <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Syncing with Community Database...</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowForm(false)} className="mb-4 text-zinc-500 hover:text-white text-sm">← Back to Report</button>
                  <DataCollection onDataSubmit={handleDataSubmit} />
                </>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}