import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle user sign up
const useSignUp = () => {
  const { signUp } = useUser();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle user sign up
  const handleSignUp = async (fullName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signUp(fullName, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleSignUp, error, loading };
};

export default useSignUp;
