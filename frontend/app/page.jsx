'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Import Auth Context
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Shield, BarChart3, ArrowRight, Globe, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const { user, logout } = useAuth(); // Get user status and logout function

  const features = [
    {
      icon: <Sparkles className="text-green-400" size={24} />,
      title: "AI Ecosystem Modeling",
      desc: "Our neural networks simulate thousands of environmental variables to find your optimal path."
    },
    {
      icon: <BarChart3 className="text-cyan-400" size={24} />,
      title: "Real-time Impact Tracking",
      desc: "Monitor carbon offsets and water conservation metrics with aerospace precision."
    },
    {
      icon: <Shield className="text-emerald-400" size={24} />,
      title: "Policy Compliance",
      desc: "Automatically align your community strategies with global sustainability standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080e0d] text-white overflow-hidden selection:bg-green-500/30">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl italic tracking-tighter cursor-pointer">
          <div className="bg-green-500 p-1.5 rounded-lg text-black">
            <Leaf size={20} fill="currentColor" />
          </div>
          <span>EcoMind<span className="text-green-400 not-italic">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#features" className="hover:text-white transition-colors">Technology</Link>
          <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
          
          {/* CONDITIONAL RENDERING: Check if user exists */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-green-400 border border-green-500/20 px-3 py-1 rounded-full bg-green-500/10">
                {user.displayName || 'Authorized User'}
              </span>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 transition-all"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Globe size={14} className="animate-spin-slow" /> Engineering a Greener Future
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400">
              SUSTAINABILITY
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
            The world's first AI-driven ecosystem management platform. 
            Transform community data into actionable climate strategies in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={user ? "/dashboard" : "/login"} 
              className="w-full sm:w-auto px-10 py-5 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl transition-all shadow-[0_20px_50px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 group"
            >
              Start Analysis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
              View Case Studies
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Teaser */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/20 blur-[150px] -z-10 rounded-full" />
        <div className="backdrop-blur-3xl bg-black/40 border border-white/10 rounded-[3rem] p-4 shadow-2xl overflow-hidden">
             <div className="aspect-video bg-zinc-900/50 rounded-[2rem] border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#080e0d] to-transparent opacity-60" />
                <div className="p-8 text-center relative z-10">
                    <Sparkles className="mx-auto mb-4 text-green-500" size={48} />
                    <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase">System Interface Preview</p>
                </div>
             </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-xs tracking-widest uppercase font-bold">
        © 2026 EcoMindAI Systems • Built for the Planet
      </footer>
    </div>
  );
}