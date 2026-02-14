'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { googleLogin, user } = useAuth();
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
        await googleLogin(); // Standard login
    } catch (err) {
        console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#080e0d] flex items-center justify-center p-6 selection:bg-green-500/30">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl relative z-10">
        
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-emerald-950/50 to-transparent border-r border-white/5">
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-green-400 transition-all mb-12 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Return Home</span>
            </Link>
            <div className="flex items-center gap-2 text-2xl font-black italic tracking-tighter text-white mb-8">
              <div className="bg-green-500 p-1.5 rounded-lg text-black">
                <Leaf size={20} fill="currentColor" />
              </div>
              <span>EcoMind<span className="text-green-400 not-italic">AI</span></span>
            </div>
            <h1 className="text-5xl font-black leading-[0.9] tracking-tighter text-white mb-6 uppercase relative">
              Secure <br />
              <span className="relative inline-block"><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Environmental</span></span> <br />Access
            </h1>
            <div className="space-y-6 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"><ShieldCheck size={20} /></div>
                <div><h4 className="text-white font-bold text-sm">Encrypted Dashboard</h4><p className="text-zinc-500 text-xs">Your community data is protected with enterprise-grade security.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"><Zap size={20} /></div>
                <div><h4 className="text-white font-bold text-sm">Instant Sync</h4><p className="text-zinc-500 text-xs">Access real-time AI modeling across all your devices.</p></div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] relative z-10">© 2026 EcoMindAI • System v4.0.2</div>
        </div>

        {/* Right Side - Login */}
        <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-white/[0.01]">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-sm text-center lg:text-left">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Identity Portal</h2>
              <p className="text-zinc-500 text-sm">Authenticating your access to the sustainability network.</p>
            </div>

            <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-black py-4 px-6 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-green-500/5 group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Continue with Google
            </button>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600"><span className="bg-[#0b1211] px-4">New User?</span></div>
            </div>

            <div className="text-center w-full mb-6">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold group w-full">
                Create a new profile <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-green-500" />
              </Link>
            </div>

            <p className="text-center text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest font-bold">
              By entering the portal, you agree to our <br />
              <Link href="#" className="text-zinc-400 hover:text-green-500 transition-colors underline underline-offset-4">Terms</Link> and <Link href="#" className="text-zinc-400 hover:text-green-500 transition-colors underline underline-offset-4">Privacy Protocols</Link>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}