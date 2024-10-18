import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const { signUp, loading } = useAuth();

  const handleSignUp = async (fullName, email, password) => {
    try {
      setError(null);
      await signUp(fullName, email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  return { handleSignUp, error, loading };
};

export default useSignUp;
