import { useLayoutEffect } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../contexts/UserContext";
import useSignOut from "../hooks/useSignOut";
import ReviewItem from "./ReviewItem";
import FavoriteItem from "./FavoriteItem";

// User profile component
const UserProfile = ({ navigation }) => {
  const { user, reviews, favorites, loading } = useUser();
  const { handleSignOut } = useSignOut();

  // Sets the options for header so that the "Edit Profile" is placed in the rightmost side of the header bar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  // Show loading indicator while fetching user data
  if (loading) return <ActivityIndicator size="large" color="white" />;

  // Filter reviews and favorites by the current user
  const userReviews = reviews
    .filter((review) => review.userId === user.uid)
    .sort((a, b) => b.createdAt - a.createdAt);

  // Data for the user profile flatlist
  const data = [
    { type: "profile" },
    { type: "reviews", data: userReviews },
    { type: "favorites", data: favorites },
    { type: "signOut" },
  ];

  // Render item switch for the flatlist
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "profile":
        return (
          <View style={styles.profileContainer}>
            <Image
              style={styles.image}
              source={{ uri: user.photoURL }}
              resizeMode={"cover"}
            />
            <Text style={styles.displayName}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        );
      case "reviews":
        return item.data && item.data.length > 0 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.dataHeader}>My Reviews</Text>
            <FlatList
              data={item.data}
              renderItem={({ item }) => <ReviewItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <Text style={styles.noDataHeader}>No reviews yet</Text>
        );
      case "favorites":
        return item.data && item.data.length > 0 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.dataHeader}>My Favorites</Text>
            <FlatList
              data={item.data}
              renderItem={({ item }) => (
                <FavoriteItem
                  item={item}
                  userId={user.uid}
                  favorites={favorites}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <Text style={styles.noDataHeader}>No favorites yet</Text>
        );
      case "signOut":
        return (
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </Pressable>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.type}-${index}`}
      style={{ backgroundColor: "#F4ECE3" }}
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
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  displayName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6F3E37",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#A87544",
    marginTop: 5,
  },
  editButton: {
    padding: 10,
    marginRight: 5,
    backgroundColor: "#A87544",
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#A87544",
    borderWidth: 2,
  },
  sectionContainer: {
    marginTop: 10,
  },
  dataHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F3E37",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  noDataHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#BDB3A0",
    textAlign: "center",
    marginTop: 20,
  },
  signOutButton: {
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#C70000",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default UserProfile;
