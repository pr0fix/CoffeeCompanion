import { View, StyleSheet } from "react-native";
import UserProfile from "../components/UserProfile";

// Screen that renders the UserProfile component
const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UserProfile navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
});

export default UserProfileScreen;
