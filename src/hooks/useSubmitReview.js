import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle submitting a review
const useSubmitReview = () => {
  const { addReview } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle submitting a review
  const handleSubmitReview = async (
    shopId,
    shopName,
    shopAddress,
    reviewText,
    onSuccess
  ) => {
    setLoading(true);
    setError("");
    try {
      await addReview(shopId, shopName, shopAddress, reviewText);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleSubmitReview, error, loading };
};

export default useSubmitReview;
