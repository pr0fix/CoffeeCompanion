import { useLayoutEffect } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import useSignOut from "../hooks/useSignOut";
import ReviewItem from "./ReviewItem";

const UserProfile = ({ navigation }) => {
  const { user, reviews } = useAuth();
  const { handleSignOut, error } = useSignOut();

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

  return (
    <View style={styles.profileContainer}>
      <Image style={styles.image} source={"source"} resizeMode={"cover"} />
      <Text>{user.email}</Text>
      {reviews && reviews.length > 0 ? (
        <>
          <Text style={styles.reviewHeader}>Your Reviews</Text>
          <FlatList
            style={{ width: "100%" }}
            data={reviews}
            renderItem={({ item }) => <ReviewItem item={item} />}
          />
        </>
      ) : (
        <Text style={styles.noReviewsHeader}>No reviews yet</Text>
      )}
      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </Pressable>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
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
  reviewHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  noReviewsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  signOutButton: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#C70000",
    borderRadius: 5,
    alignItems: "center",
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default UserProfile;
