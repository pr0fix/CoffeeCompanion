import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../api/firebaseConfig";
import {
  addReview,
  getAllReviews,
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  addProfilePicture,
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
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        await getUserFavorites(currentUser.uid, setFavorites);
        getAllReviews(setReviews);
      } else {
        setUser(null);
        setReviews([]);
        setFavorites([]);
      }
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Function to sign in a user
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error signing in:", error);
      return false;
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
        return true;
      }
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
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
  const editProfile = async (fullName, profileImageURI) => {
    try {
      if (!user || !user.uid) {
        console.error("User object is invalid or not logged in");
        return false;
      }

      let profileImageUrl = user.photoURL;

      if (profileImageURI) {
        const response = await fetch(profileImageURI);
        const blob = await response.blob();
        profileImageUrl = await addProfilePicture(user, blob);
      }

      const updates = {};
      if (fullName && fullName !== user.displayName) {
        updates.displayName = fullName;
      }
      if (profileImageUrl && profileImageUrl !== user.photoURL) {
        updates.photoURL = profileImageUrl;
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(auth.currentUser, updates);
        setUser((prevUser) => ({ ...prevUser, ...updates }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating profile:", error);
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
        loading,
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
