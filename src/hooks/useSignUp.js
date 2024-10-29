import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle user sign up
const useSignUp = () => {
  const { signUp } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle user sign up
  const handleSignUp = async (fullName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const signUpSuccessful = await signUp(fullName, email, password);
      if (signUpSuccessful) {
        return true;
      }
      setError("Sign up failed. Please try again.");
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { handleSignUp, error, loading };
};

export default useSignUp;
