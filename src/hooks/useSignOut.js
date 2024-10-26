import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle user sign out
const useSignOut = () => {
  const { signout } = useUser();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle user sign out
  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signout();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignOut, error, loading };
};

export default useSignOut;
