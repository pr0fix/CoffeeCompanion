import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useAddFavorite = () => {
  const { addFavorite, removeFavorite, loading } = useUser();
  const [error, setError] = useState(null);

  const handleAddFavorite = async (userId, shopId) => {
    try {
      await addFavorite(userId, shopId);
      console.log("Added to favorites");
    } catch (err) {
      setError(err.message);
    }
  };

  // create handleRemoveFavorite
  const handleRemoveFavorite = async (userId, shopId) => {
    try {
      await removeFavorite(userId, shopId);
      console.log("Removed from favorites");
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleAddFavorite, handleRemoveFavorite, error, loading };
};

export default useAddFavorite;
