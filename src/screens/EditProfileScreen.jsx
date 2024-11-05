import { StyleSheet, View } from "react-native";
import EditProfile from "../components/Profile/EditProfile";

// Screen that renders the EditProfile component
const EditProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <EditProfile navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProfileScreen;
