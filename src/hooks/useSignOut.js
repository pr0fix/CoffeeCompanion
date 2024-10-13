import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useSignOut = () => {
  const [error, setError] = useState(null);
  const { signout } = useAuth();

  const handleSignOut = async () => {
    try {
      setError(null);
      await signout();
      console.log("logged out");
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleSignOut, error };
};

export default useSignOut;
