import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleSignUp, error, loading };
};

export default useSignUp;
