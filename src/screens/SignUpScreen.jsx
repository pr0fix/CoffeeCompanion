import { View, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";

// Screen that renders the SignUpForm component
const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignUpForm navigation={navigation} />
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

export default SignUpScreen;
