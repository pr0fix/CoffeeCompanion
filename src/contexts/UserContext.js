import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addReview, getAllReviews } from "../api/databaseService";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const unsubscribeReviews = getAllReviews(setReviews);
        return () => unsubscribeReviews();
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
        await updateProfile(res.user, {
          displayName: fullName,
        });
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

  // Handler function for adding a new review, which provides data to db-service function
  const addReviewHandler = async (shopId, shopName, address, reviewText) => {
    try {
      await addReview(user, shopId, shopName, address, reviewText);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        reviews,
        signIn,
        signUp,
        signout,
        addReview: addReviewHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
