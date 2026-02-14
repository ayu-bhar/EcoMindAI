'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; 
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore'; 
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to fetch the latest user profile from Firestore
  const refreshUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid || user?.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        return data;
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await refreshUserData(currentUser.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleLogin = async (profileData = null) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, 'users', result.user.uid);

      let newUserData = {
        uid: result.user.uid,
        email: result.user.email,
        photoURL: result.user.photoURL,
        lastLogin: serverTimestamp(),
      };

      if (profileData) {
        newUserData = {
          ...newUserData,
          name: profileData.name,
          age: profileData.age,
          role: profileData.role,
          createdAt: serverTimestamp(),
        };
      }

      await setDoc(userRef, newUserData, { merge: true });
      await refreshUserData(result.user.uid);

      router.push('/');
    } catch (error) {
      console.error("Auth Error:", error);
      throw error;
    }
  };

  const createCommunity = async (communityDetails, initialPlan) => {
    if (!user) return;
    
    try {
      const communityId = `ECO-${Math.random().toString(36).substring(2, 5).toUpperCase()}${Math.floor(Math.random() * 10)}`;
      const communityRef = doc(db, 'communities', communityId);
      
      await setDoc(communityRef, {
        id: communityId,
        leaderId: user.uid,
        communityName: communityDetails.name,
        location: communityDetails.location,
        stats: communityDetails,
        createdAt: serverTimestamp(),
        members: [user.uid]
      });

      const planRef = collection(db, 'communities', communityId, 'plans');
      await addDoc(planRef, {
        ...initialPlan,
        title: `Initial Sustainability Roadmap`,
        status: 'Active',
        priority: 'High',
        createdAt: serverTimestamp()
      });

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { 
        communityId: communityId,
        communityName: communityDetails.name 
      });

      await refreshUserData(user.uid);
      return communityId;
    } catch (error) {
      console.error("Error creating community:", error);
      throw error;
    }
  };

  const joinCommunity = async (communityId) => {
    if (!user) return;

    try {
      const communityRef = doc(db, 'communities', communityId);
      const docSnap = await getDoc(communityRef);

      if (!docSnap.exists()) {
        throw new Error("Invalid Community ID");
      }

      const communityData = docSnap.data();
      const currentMembers = communityData.members || [];
      
      await updateDoc(communityRef, {
        members: [...currentMembers, user.uid]
      });

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { 
        communityId: communityId,
        communityName: communityData.communityName 
      });

      await refreshUserData(user.uid);
      return true;
    } catch (error) {
      console.error("Error joining community:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      googleLogin, 
      logout, 
      createCommunity, 
      joinCommunity, 
      refreshUserData, 
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);