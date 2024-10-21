import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const useSignOut = () => {
  const [error, setError] = useState(null);
  const { signout, loading } = useUser();

  const handleSignOut = async () => {
    try {
      setError(null);
      await signout();
      console.log("logged out");
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleSignOut, error, loading };
};

export default useSignOut;
