import { database } from "./firebaseConfig";
import { onValue, push, ref, set } from "firebase/database";

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
