import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../api/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { off, onValue, push, ref, set } from "firebase/database";

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        getReviews(user.uid);
      } else {
        setReviews([]);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to sign in a user
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to sign up user
  const signUp = async (fullName, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const userInfo = {
          displayName: fullName,
        };
        const userInfoRef = ref(database, `users/${res.user.uid}/info`);
        const newUserInfoRef = push(userInfoRef);
        await set(newUserInfoRef, userInfo);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to sign out a user
  // not in camelCase since firebase/auth has a method called signOut
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (shopId, shopName, address, reviewText) => {
    try {
      if (user) {
        const reviewRef = ref(database, `users/${user.uid}/reviews`);
        const newReviewRef = push(reviewRef);
        await set(newReviewRef, {
          shopId,
          shopName,
          address,
          text: reviewText,
          createdAt: new Date().toLocaleDateString(),
        });
        console.log("Review added successfully");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async (userId) => {
    const reviewsRef = ref(database, `users/${userId}/reviews`);
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.entries(data).map(([id, review]) => ({
          id,
          ...review,
        }));
        setReviews(reviewsArray);
      } else {
        setReviews([]);
      }
    });

    return () => off(reviewsRef);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        reviews,
        signIn,
        signUp,
        signout,
        addReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
