'use client';

import { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const inputClasses = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500";

  return (
    <div className="flex min-h-[80vh] w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/[0.01] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      
      {/* --- Left Side: Brand/Visual (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600/20 to-cyan-600/10 p-12 flex-col justify-between relative border-r border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Leaf className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">EcoMindAI</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            The future is <br />
            <span className="text-green-400 italic">sustainable.</span>
          </h2>
          <p className="mt-4 text-zinc-400 font-light max-w-xs leading-relaxed">
            Join thousands of communities using AI to orchestrate environmental change.
          </p>
        </div>

        <div className="relative z-10 bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md">
          <Sparkles className="text-green-400 w-5 h-5 mb-2" />
          <p className="text-sm text-zinc-300 italic">
            "We decreased our community carbon footprint by 22% in the first quarter using EcoMindAI."
          </p>
          <p className="mt-3 text-xs font-bold text-zinc-500 uppercase tracking-widest">— Riverdale Green Council</p>
        </div>
      </div>

      {/* --- Right Side: The Form --- */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#080e0d]">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Movement'}
            </h3>
            <p className="text-zinc-500 text-sm">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start your journey towards a greener community.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative group">
                <User className={iconClasses} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className={inputClasses}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className={iconClasses} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className={inputClasses}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative group">
              <Lock className={iconClasses} />
              <input 
                type="password" 
                placeholder="Password" 
                className={inputClasses}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-xs text-green-500/80 hover:text-green-400 transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-500 font-bold hover:underline underline-offset-4 transition-all"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}