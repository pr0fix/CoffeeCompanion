import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useSubmitReview = () => {
  const [error, setError] = useState(null);
  const { addReview, loading } = useUser();

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
