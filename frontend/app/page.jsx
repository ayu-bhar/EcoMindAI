'use client';

import { useAuthForm } from '@/hooks/useAuthForm';
import { 
  Leaf, User, Calendar, Users, Loader2, Sparkles 
} from 'lucide-react';

export default function AuthPage() {
  // Extract logic from the hook
  const { 
    isLogin, 
    loading, 
    formData, 
    handleInputChange, 
    toggleAuthMode, 
    handleGoogleAuth 
  } = useAuthForm();

  // Visual classes
  const inputClasses = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500";

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl min-h-[600px] mx-auto backdrop-blur-xl bg-white/[0.01] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        {/* --- Left Side: Visuals --- */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-900/40 to-black p-12 flex-col justify-between relative border-r border-white/5">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Leaf className="text-black w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">EcoMindAI</span>
            </div>
            
            <h2 className="text-5xl font-bold text-white leading-[1.1]">
              Smarter Plans <br />
              For A <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Greener Earth.</span>
            </h2>
            
            <p className="mt-6 text-zinc-400 font-light max-w-sm leading-relaxed text-lg">
              AI-driven sustainability planning for communities, tailored to your local resources.
            </p>
          </div>

          <div className="relative z-10 bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <Sparkles className="text-green-400 w-5 h-5 mb-3" />
            <p className="text-sm text-zinc-300 italic mb-3">
              "We decreased our community carbon footprint by 22% in the first quarter using EcoMindAI."
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">— Riverdale Green Council</span>
            </div>
          </div>
        </div>

        {/* --- Right Side: Form --- */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#080e0d]">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Mission'}
              </h3>
              <p className="text-zinc-500 text-sm">
                {isLogin 
                  ? 'Sign in to access your community dashboard.' 
                  : 'Fill in your details to generate your first plan.'}
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              
              {/* Render Inputs ONLY if Signing Up */}
              {!isLogin && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="relative group">
                    <User className={iconClasses} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className={inputClasses}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="relative group">
                    <Calendar className={iconClasses} />
                    <input 
                      type="number" 
                      placeholder="Age" 
                      className={inputClasses}
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>

                  <div className="relative group">
                    <Users className={iconClasses} />
                    <select 
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    >
                      <option value="citizen" className="bg-zinc-900">I am a Resident/Citizen</option>
                      <option value="leader" className="bg-zinc-900">I am a Community Leader</option>
                      <option value="researcher" className="bg-zinc-900">I am a Researcher</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Google Button */}
              <button 
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="w-5 h-5" 
                  />
                )}
                {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500">
                {isLogin ? "New to EcoMind?" : "Already have an account?"}{' '}
                <button 
                  onClick={toggleAuthMode}
                  className="text-green-500 font-bold hover:text-green-400 hover:underline underline-offset-4 transition-all ml-1"
                >
                  {isLogin ? 'Create Account' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}