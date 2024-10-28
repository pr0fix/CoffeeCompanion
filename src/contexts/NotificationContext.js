import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

// Notification context provider
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Function to add a notification
  const addNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
