import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

// Custom hook to handle user sign out
const useSignOut = () => {
  const { signout } = useUser();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle user sign out
  const handleSignOut = async () => {
    setLoading(true);
    setError("");
    try {
      await signout();
      addNotification("You have been signed out successfully!", "success");
    } catch (err) {
      setError(err.message);
      addNotification("Error signing out. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignOut, error, loading };
};

export default useSignOut;
