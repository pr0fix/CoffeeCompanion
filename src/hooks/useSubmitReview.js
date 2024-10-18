import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSubmitReview = () => {
  const [error, setError] = useState(null);
  const { addReview, loading } = useAuth();

  const handleSubmitReview = async (
    shopId,
    shopName,
    shopAddress,
    reviewText,
    onSuccess
  ) => {
    try {
      setError(null);
      await addReview(shopId, shopName, shopAddress, reviewText);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return { handleSubmitReview, error, loading };
};

export default useSubmitReview;
