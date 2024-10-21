import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useAddFavorite = () => {
  const [error, setError] = useState(null);
  const { addFavorite, loading } = useUser();

  const handleAddFavorite = async (userId, shopId) => {
    try {
      await addFavorite(userId, shopId);
      console.log("Added to favorites");
    } catch (err) {
      setError(err.message);
    }
  };

  // create handleRemoveFavorite

  return { handleAddFavorite, error, loading };
};

export default useAddFavorite;
