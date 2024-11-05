import { useState, useCallback } from "react";

// Custom hook to manage the state of profile sections
export const useProfileSections = () => {
  const [isReviewsCollapsed, setIsReviewsCollapsed] = useState(true);
  const [isFavoritesCollapsed, setIsFavoritesCollapsed] = useState(true);

  // Toggle the visibility of the reviews section using useCallback to prevent unnecessary re-renders
  const toggleReviews = useCallback(
    () => setIsReviewsCollapsed((prev) => !prev),
    []
  );

  // Toggle the visibility of the favorites section using useCallback to prevent unnecessary re-renders
  const toggleFavorites = useCallback(
    () => setIsFavoritesCollapsed((prev) => !prev),
    []
  );

  // Return the state values and functions to toggle the sections
  return {
    isReviewsCollapsed,
    isFavoritesCollapsed,
    toggleReviews,
    toggleFavorites,
  };
};
