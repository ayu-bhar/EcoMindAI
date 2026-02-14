import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Checks if a user profile already exists in Firestore.
 */
export const checkUserExists = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};

/**
 * Creates a new user profile in Firestore.
 */
export const createUserProfile = async (user, additionalData) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: additionalData.name || user.displayName,
      age: additionalData.age,
      role: additionalData.role,
      createdAt: new Date().toISOString(),
      photoURL: user.photoURL,
    });
    return true;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};