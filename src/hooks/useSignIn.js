import { useState } from "react";
import { useUser } from "../contexts/UserContext";

// Custom hook to handle user sign in
const useSignIn = () => {
  const { signIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle user sign in
  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const signInSuccessful = await signIn(email, password);
      if (signInSuccessful) {
        return true;
      }
      setError("Incorrect email or password.");
      return false;
    } catch (err) {
      setError("Incorrect email or password.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, error, loading };
};

export default useSignIn;
