'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; 
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * googleLogin
   * @param {Object|null} profileData - Optional. { name, age } from Signup page.
   */
  const googleLogin = async (profileData = null) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Reference to the user document in Firestore
      const userRef = doc(db, 'users', user.uid);

      // Basic data we always want to capture/update on login
      let userData = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
      };

      // If profileData exists (User came from Signup page), add Name/Age
      if (profileData) {
        userData = {
          ...userData,
          name: profileData.name,
          age: profileData.age,
          createdAt: serverTimestamp(), // Only set this when registering/updating profile
        };
      }

      // Save to Firestore using merge: true 
      // This prevents overwriting existing fields if we just do a standard login later
      await setDoc(userRef, userData, { merge: true });

      router.push('/dashboard');
    } catch (error) {
      console.error("Auth Error:", error);
      throw error; // Throw to the page component to handle UI alerts
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, googleLogin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);