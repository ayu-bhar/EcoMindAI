'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft, Globe, Cpu, ChevronRight, User, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { googleLogin, user } = useAuth();
  const router = useRouter();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });
  const [error, setError] = useState('');

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Handle Sign Up Flow
  const handleSignUp = async () => {
    // 1. Validation
    if (!formData.name.trim() || !formData.age.trim()) {
      setError('Please complete your profile identity.');
      return;
    }

    if (parseInt(formData.age) < 13) {
      setError('Minimum age requirement not met.');
      return;
    }

    try {
      // 2. Trigger Google Login WITH the form data
      await googleLogin({
        name: formData.name,
        age: formData.age
      });
      // AuthContext handles the redirection to /dashboard
    } catch (err) {
      setError('Authentication handshake failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080e0d] flex items-center justify-center p-6 selection:bg-teal-500/30">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

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
              Join The <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500">Global Grid</span>
              </span> 
              <br />Initiative
            </h1>
            <div className="space-y-6 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400"><Globe size={20} /></div>
                <div><h4 className="text-white font-bold text-sm">Planetary Scale</h4><p className="text-zinc-500 text-xs">Contribute to the largest open-source climate dataset.</p></div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] relative z-10">© 2026 EcoMindAI • New User Protocol</div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-white/[0.01]">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm text-center lg:text-left">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Initialize Profile</h2>
              <p className="text-zinc-500 text-sm">Enter your biological metrics to proceed.</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-400 transition-colors" size={18} />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Designation (Name)" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm font-medium" />
              </div>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-400 transition-colors" size={18} />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Chronological Age" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm font-medium appearance-none" />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-xs font-bold">
                <AlertCircle size={14} />{error}
              </motion.div>
            )}

            <button onClick={handleSignUp} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black py-4 px-6 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-green-900/20 group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
              Sign Up with Google
            </button>

            <div className="text-center w-full mt-8">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold group w-full py-2">
                Access existing account <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-green-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}