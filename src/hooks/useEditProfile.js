import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useEditProfile = () => {
  const [error, setError] = useState(null);
  const { editProfile, loading } = useUser();

  const handleEditProfile = async (fullName) => {
    try {
      setError(null);
      await editProfile(fullName);
    } catch (err) {
      setError(err.message);
    }
  };
  return { handleEditProfile, error, loading };
};

export default useEditProfile;
