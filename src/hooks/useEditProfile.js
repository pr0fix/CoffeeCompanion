import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle editing user profile
const useEditProfile = () => {
  const { editProfile } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle editing user profile
  const handleEditProfile = async (fullName, profileImage) => {
    setLoading(true);
    setError("");
    try {
      const wasUpdated = await editProfile(fullName, profileImage);
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
