import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle user sign in
const useSignIn = () => {
  const { signIn } = useUser();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle user sign in
  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, error, loading };
};

export default useSignIn;
