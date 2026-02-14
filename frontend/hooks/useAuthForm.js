import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { checkUserExists, createUserProfile } from '@/services/authService';

export const useAuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    role: 'citizen' // default value
  });

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Toggle Mode
  const toggleAuthMode = () => setIsLogin(!isLogin);

  // Main Auth Logic
  const handleGoogleAuth = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // 1. Trigger Google Popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Check Database
      const userExists = await checkUserExists(user.uid);

      if (isLogin) {
        // --- LOGIN FLOW ---
        if (userExists) {
          router.push('/dashboard');
        } else {
          alert("Account not found. Please switch to Sign Up to create a profile.");
          setIsLogin(false); // Auto-switch to signup
        }
      } else {
        // --- SIGNUP FLOW ---
        // Basic Validation
        if (!formData.age || !formData.name) {
          alert("Please fill in your Name and Age to complete registration.");
          setLoading(false);
          return;
        }

        // Create Profile
        await createUserProfile(user, formData);
        router.push('/dashboard');
      }

    } catch (error) {
      console.error("Auth process failed:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    loading,
    formData,
    handleInputChange,
    toggleAuthMode,
    handleGoogleAuth
  };
};