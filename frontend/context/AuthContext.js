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
  const [userData, setUserData] = useState(null); // Stores Role, CommunityID, etc.
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Listen for Auth Changes & Fetch User Profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch extended profile (Role, Community ID)
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Google Login
  const googleLogin = async (profileData = null) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);

      let newUserData = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
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
      
      // Fetch the fresh data to update state immediately
      const freshSnap = await getDoc(userRef);
      setUserData(freshSnap.data());

      router.push('/dashboard');
    } catch (error) {
      console.error("Auth Error:", error);
      throw error;
    }
  };

  // 3. Create Community (Leader Only)
  const createCommunity = async (communityDetails, initialPlan) => {
    if (!user) return;
    
    try {
      // Generate a simple 6-char ID (e.g., "ECO-9X2")
      const communityId = `ECO-${Math.random().toString(36).substring(2, 5).toUpperCase()}${Math.floor(Math.random() * 10)}`;
      
      const communityRef = doc(db, 'communities', communityId);
      
      // Save Community Data
      await setDoc(communityRef, {
        id: communityId,
        leaderId: user.uid,
        name: communityDetails.name,
        location: communityDetails.location,
        stats: communityDetails, // Save form data as baseline stats
        createdAt: serverTimestamp(),
        members: [user.uid]
      });

      // Save the Initial Plan to a subcollection
      const planRef = collection(db, 'communities', communityId, 'plans');
      await addDoc(planRef, {
        ...initialPlan,
        title: `Initial Sustainability Roadmap`,
        status: 'Active',
        priority: 'High',
        createdAt: serverTimestamp()
      });

      // Update Leader's Profile with Community ID
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { communityId: communityId });

      // Update Local State
      setUserData(prev => ({ ...prev, communityId }));
      
      return communityId;
    } catch (error) {
      console.error("Error creating community:", error);
      throw error;
    }
  };

  // 4. Join Community (Citizen Only)
  const joinCommunity = async (communityId) => {
    if (!user) return;

    try {
      // Check if community exists
      const communityRef = doc(db, 'communities', communityId);
      const docSnap = await getDoc(communityRef);

      if (!docSnap.exists()) {
        throw new Error("Invalid Community ID");
      }

      // Add user to community member list
      const currentMembers = docSnap.data().members || [];
      await updateDoc(communityRef, {
        members: [...currentMembers, user.uid]
      });

      // Update Citizen's Profile
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { communityId: communityId });

      // Update Local State
      setUserData(prev => ({ ...prev, communityId }));

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
    <AuthContext.Provider value={{ user, userData, googleLogin, logout, createCommunity, joinCommunity, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);