import { database } from "./firebaseConfig";
import { onValue, push, ref, set } from "firebase/database";

// Service to add a review to firebase db
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
      createdAt: new Date().toLocaleDateString(),
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

// create function to fetch user favorites

// Function for user to add a cafe to favorites
export const addToFavorites = async (userId, shopId) => {
  const favoriteRef = ref(database, `users/${userId}/favorites`);
  const newFavoriteRef = push(favoriteRef);
  try {
    await set(newFavoriteRef, {
      shopId,
    });
  } catch (error) {
    console.error("Error adding shop to favorites:", error);
  }
};

// create function to remove a cafe from favorites
