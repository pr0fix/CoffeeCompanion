import { database, storage } from "./firebaseConfig";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { onValue, push, ref, remove, set } from "firebase/database";
import { ref as sRef } from "firebase/storage";

// Function to add users profile picture to firebase storage
export const addProfilePicture = async (user, profileImageBlob) => {
  if (!user || !profileImageBlob) return;
  try {
    const imageRef = sRef(storage, `profileImages/${user.uid}`);
    await uploadBytes(imageRef, profileImageBlob);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error adding profile picture:", error);
    return null;
  }
};

// Function to add a review to firebase db
export const addReview = async (
  user,
  shopId,
  shopName,
  address,
  reviewText
) => {
  if (!user) return;

  const reviewRef = ref(database, `reviews`);
  const newReviewRef = push(reviewRef);

  try {
    await set(newReviewRef, {
      userId: user.uid,
      username: user.displayName,
      shopId,
      shopName,
      address,
      text: reviewText,
      createdAt: new Date().toISOString(),
    });
    console.log("Review added successfully");
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// Function to fetch reviews from firebase db
export const getAllReviews = (setReviews) => {
  const reviewsRef = ref(database, `reviews`);

  return onValue(reviewsRef, (snapshot) => {
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
};

// Function to fetch user favorites from db
export const getUserFavorites = async (userId, setFavorites) => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  return onValue(favoritesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const favoritesArray = Object.entries(data).map(([id, favorite]) => ({
        id,
        ...favorite,
      }));
      setFavorites(favoritesArray);
    } else {
      setFavorites([]);
    }
  });
};

// Function to add favorite cafes to db
export const addToFavorites = async (userId, shopId, shopName, address) => {
  const validAddress = address || "No address available.";
  const favoriteRef = ref(database, `users/${userId}/favorites/${shopId}`);
  try {
    await set(favoriteRef, {
      shopName,
      address: validAddress,
    });
  } catch (error) {
    console.error("Error adding shop to favorites:", error);
  }
};

// Function to remove favorite cafes from db
export const removeFromFavorites = async (userId, shopId) => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${shopId}`);
  try {
    await remove(favoriteRef);
  } catch (error) {
    console.error("Error removing shop from favorites:", error);
  }
};
