import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useLogOut = () => {
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      setError(null);
      await logout();
      console.log("logged out");
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleLogOut, error };
};

export default useLogOut;
