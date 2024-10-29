import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle adding and removing favorites
const useAddFavorite = () => {
  const { addFavorite, removeFavorite } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to add a shop to favorites
  const handleAddFavorite = async (userId, shopId, shopName, address) => {
    setLoading(true);
    setError(null);
    try {
      await addFavorite(userId, shopId, shopName, address);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a shop from favorites
  const handleRemoveFavorite = async (userId, shopId) => {
    setLoading(true);
    setError(null);
    try {
      await removeFavorite(userId, shopId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleAddFavorite, handleRemoveFavorite, error, loading };
};

export default useAddFavorite;
