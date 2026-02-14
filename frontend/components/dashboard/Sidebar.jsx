// Add imports
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth(); // Get logout function
  
  // ... rest of your code ...

  return (
     // ... inside your JSX ...
      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={logout} // Add onClick handler
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
     // ...
  );
}