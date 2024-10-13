import { StyleSheet, View } from "react-native";
import SignInForm from "../components/SignInForm";

// Screen that renders the SignInForm component
const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignInForm navigation={navigation} />
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

export default SignInScreen;
