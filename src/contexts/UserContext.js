import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addReview,
  getAllReviews,
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../api/databaseService";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        await getUserFavorites(currentUser.uid, setFavorites);
        getAllReviews(setReviews);
      } else {
        setUser(null);
        setReviews([]);
        setFavorites([]);
        setLoading(false);
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
      console.error("Error signing in:", error);
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
      console.error("Error signing up:", error);
    }
  };

  // Function to sign out a user
  // not in camelCase since firebase/auth has a method called signOut
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to edit user profile details (currently only the name displayed in profile)
  // todo: add email change, password change & possibility to add user bio
  const editProfile = async (fullName) => {
    try {
      if (user && fullName !== user.displayName) {
        await updateProfile(user, { displayName: fullName });
        setUser((prevUser) => ({ ...prevUser, displayName: fullName }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating profile:", error.message);
      return false;
    }
  };

  // Handler function for adding a new review, which provides data to db-service function
  const addReviewHandler = async (shopId, shopName, address, reviewText) => {
    try {
      await addReview(user, shopId, shopName, address, reviewText);
      await getUserFavorites(user.uid, setFavorites);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Handler function for adding a coffee shop to favorites
  const addFavoriteHandler = async (userId, shopId, shopName, address) => {
    try {
      await addToFavorites(userId, shopId, shopName, address);
      await getUserFavorites(user.uid, setFavorites);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Handler function for removing a coffee shop from favorites
  const removeFavoriteHandler = async (userId, shopId) => {
    try {
      await removeFromFavorites(userId, shopId);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        reviews,
        favorites,
        signIn,
        signUp,
        signout,
        editProfile,
        addReview: addReviewHandler,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
