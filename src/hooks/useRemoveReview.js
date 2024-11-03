import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useRemoveReview = () => {
  const { removeReview } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRemoveReview = async (userId, reviewId) => {
    setLoading(true);
    setError("");
    try {
      const reviewRemoved = await removeReview(userId, reviewId);
      return reviewRemoved;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { handleRemoveReview, error, loading };
};

export default useRemoveReview;
