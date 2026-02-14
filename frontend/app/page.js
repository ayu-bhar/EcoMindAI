'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

// Simple reusable Feature Component
const Feature = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
  >
    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-emerald-700">
          <Leaf className="fill-current" />
          <span>EcoMindAI</span>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium">Login</Link>
          <Link href="/dashboard" className="px-5 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              Powered by Google Gemini & GPT-4
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Smarter Plans for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Greener Future
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10">
              EcoMindAI uses artificial intelligence to build personalized sustainability action plans for your community, tailored to your local resources.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-semibold hover:bg-slate-800 transition"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Feature 
            icon={Zap} 
            title="AI-Powered Planning" 
            desc="Instantly generate comprehensive sustainability roadmaps using advanced LLMs." 
          />
          <Feature 
            icon={ShieldCheck} 
            title="Resource Prediction" 
            desc="Predict future shortages in water or energy with our predictive analytics engine." 
          />
          <Feature 
            icon={BarChart3} 
            title="Real-time Impact" 
            desc="Track your community's progress with live data visualization and reports." 
          />
        </div>
      </main>
    </div>
  );
}

// Helper icon for grid
function BarChart3(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
  )
}