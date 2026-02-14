'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { googleLogin } = useAuth();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Side - Visuals */}
      <div className="relative hidden md:flex flex-col justify-between bg-emerald-900 text-white p-12 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-bold mb-6">
            <Leaf className="fill-emerald-400 text-emerald-400" />
            <span>EcoMindAI</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Small Actions, <br />
            <span className="text-emerald-400">Big Impact.</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-md">
            Join thousands of communities using AI to build a sustainable future. 
            Track resources, get personalized plans, and make a difference.
          </p>
        </div>

        <div className="text-sm text-emerald-400/60 relative z-10">
          © 2024 EcoMindAI Inc.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
        >
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 transition mb-6">
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Sign in to access your community dashboard.</p>
          </div>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-4 px-6 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all active:scale-[0.98]"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-6 h-6" 
            />
            Continue with Google
          </button>

          <div className="mt-8 text-center text-xs text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </motion.div>
      </div>
    </div>
  );
}