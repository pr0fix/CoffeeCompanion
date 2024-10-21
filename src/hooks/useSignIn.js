import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const { signIn, loading } = useUser();

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
