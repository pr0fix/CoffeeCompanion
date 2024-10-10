import { StyleSheet, View } from "react-native";
import LoginForm from "../components/LoginForm";

// Screen that renders the LoginForm component
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} />
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

export default LoginScreen;
