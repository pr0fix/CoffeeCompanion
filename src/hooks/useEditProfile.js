import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle editing user profile
const useEditProfile = () => {
  const { editProfile } = useUser();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle editing user profile
  const handleEditProfile = async (fullName) => {
    setLoading(true);
    setError(null);
    try {
      const wasUpdated = await editProfile(fullName);
      if (wasUpdated) {
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { handleEditProfile, error, loading };
};

export default useEditProfile;
