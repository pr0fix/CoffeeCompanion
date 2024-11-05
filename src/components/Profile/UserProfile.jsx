import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useUser } from "../../contexts/UserContext";
import { useNotification } from "../../contexts/NotificationContext";
import useSignOut from "../../hooks/useSignOut";
import useRemoveReview from "../../hooks/useRemoveReview";
import { useProfileSections } from "../../hooks/useProfileSections";
import ProfileHeader from "./ProfileHeader";
import CollapsibleSection from "./CollapsibleSection";
import ReviewsList from "../ReviewsList";
import FavoritesList from "./FavoritesList";
import SignOutButton from "./SignOutButton";

// User profile component
const UserProfile = ({ navigation }) => {
  const { user, reviews, favorites, loading, error } = useUser();
  const { handleSignOut } = useSignOut();
  const { handleRemoveReview } = useRemoveReview();
  const { addNotification } = useNotification();

  const {
    isReviewsCollapsed,
    isFavoritesCollapsed,
    toggleReviews,
    toggleFavorites,
  } = useProfileSections();

  // Show loading indicator while fetching user data
  if (loading) return <ActivityIndicator size="large" color="white" />;

  // Filter reviews and favorites by the current user
  const userReviews = reviews
    .filter((review) => review.userId === user.uid)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const onRemovePress = async (reviewId) => {
    if (!user || !user.uid) {
      return;
    }

    try {
      const removeSuccessful = await handleRemoveReview(user.uid, reviewId);
      if (removeSuccessful) {
        addNotification("Review removed successfully!", "success");
      } else {
        addNotification("Error removing review!", "error");
      }
    } catch (error) {
      console.error("Error removing review:", error);
      addNotification("Error removing review!", "error");
    }
  };

  const profileSections = [
    {
      type: "profile",
      render: () => <ProfileHeader user={user} navigation={navigation} />,
    },
    {
      type: "reviews",
      render: () => (
        <CollapsibleSection
          title="My Reviews"
          count={userReviews.length}
          isCollapsed={isReviewsCollapsed}
          onPress={toggleReviews}
        >
          <ReviewsList reviews={userReviews} onRemovePress={onRemovePress} />
        </CollapsibleSection>
      ),
    },
    {
      type: "favorites",
      render: () => (
        <CollapsibleSection
          title="My Favorites"
          count={favorites.length}
          isCollapsed={isFavoritesCollapsed}
          onPress={toggleFavorites}
        >
          <FavoritesList favorites={favorites} userId={user.uid} />
        </CollapsibleSection>
      ),
    },
    {
      type: "signOut",
      render: () => <SignOutButton onPress={handleSignOut} />,
    },
  ];

  return (
    <FlatList
      data={profileSections}
      renderItem={({ item }) => item.render()}
      keyExtractor={(item) => item.type}
      style={styles.flatlist}
      contentContainerStyle={styles.container}
      initialNumToRender={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#F4ECE3",
  },
  flatlist: {
    backgroundColor: "#F4ECE3",
  },
});
export default UserProfile;
