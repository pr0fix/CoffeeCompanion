import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const { signIn, loading } = useAuth();

  const handleSignIn = async (email, password) => {
    try {
      setError(null);
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleSignIn, error, loading };
};

export default useSignIn;
