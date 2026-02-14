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
   * @param {Object|null} profileData - Optional. { name, age, role } from Signup page.
   */
  const googleLogin = async (profileData = null) => {
    const provider = new GoogleAuthProvider();
    try {
      // 1. Authenticate with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log("Authentication successful for:", user.email);

      // 2. Prepare Database Reference
      const userRef = doc(db, 'users', user.uid);

      // 3. Prepare User Data Object
      // Basic info (always update this)
      let userData = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
      };

      // If we have extra profile data (from Signup), merge it in
      if (profileData) {
        console.log("Profile Data received:", profileData);
        userData = {
          ...userData,
          name: profileData.name,
          age: profileData.age,
          role: profileData.role,
          // Only set createdAt if it doesn't exist (we'll handle this via merge logic below)
          createdAt: serverTimestamp(),
        };
      }

      // 4. Write to Firestore
      // { merge: true } ensures we don't overwrite existing fields if we just do a standard login later
      await setDoc(userRef, userData, { merge: true });
      console.log("Database write successful!");

      // 5. Redirect to HOME PAGE instead of dashboard
      router.push('/'); 

    } catch (error) {
      console.error("Authentication failed:", error);
      throw error; 
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