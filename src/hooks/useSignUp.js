import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const { signUp, loading } = useUser();

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
