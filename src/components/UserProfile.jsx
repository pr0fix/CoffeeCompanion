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
  const { handleSignOut, error } = useSignOut();

  // Sets the options for header so that the "Edit Profile" is placed in the rightmost side of the header bar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text>Edit Profile</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  if (loading) return <ActivityIndicator size="large" color="white" />;

  const userReviews = reviews.filter((review) => review.userId === user.uid);

  const data = [
    { type: "profile" },
    { type: "reviews", data: userReviews },
    { type: "favorites", data: favorites },
    { type: "signOut" },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "profile":
        return (
          <View style={styles.profileContainer}>
            <Image
              style={styles.image}
              source={"source"}
              resizeMode={"cover"}
            />
            <Text style={styles.displayName}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        );
      case "reviews":
        return item.data && item.data.length > 0 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.dataHeader}>Your Reviews</Text>
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
            <Text style={styles.dataHeader}>Your Favorites</Text>
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
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  editButton: {
    marginTop: 5,
    marginRight: 5,
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 75,
  },
  dataHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  noDataHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  flatlist: {
    width: "100%",
    marginBottom: 20,
  },
  signOutButton: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#C70000",
    borderRadius: 5,
    alignSelf: "center",
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default UserProfile;
