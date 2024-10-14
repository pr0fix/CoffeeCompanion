import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSignOut = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signout } = useAuth();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signout();
      console.log("logged out");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignOut, error, loading };
};

export default useSignOut;
