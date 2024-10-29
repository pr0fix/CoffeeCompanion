import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import useSignIn from "../hooks/useSignIn";
import { useNotification } from "../contexts/NotificationContext";

// Validator for fields in sign in form
const signInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Sign-in form component
const SignInForm = ({ navigation }) => {
  const { handleSignIn, error, loading } = useSignIn();
  const { addNotification } = useNotification();

  // Handle sign in form submit
  const onSubmit = async (values) => {
    const signedIn = await handleSignIn(values.email, values.password);
    if (signedIn) {
      addNotification("Signed in successfully!", "success");
    } else {
      addNotification(`${error}`, "error");
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>
        Welcome to CoffeeCompanion{"\n"}Please Sign In
      </Text>
      <View style={styles.container}>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => onSubmit(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email ? styles.inputError : null,
                ]}
                placeholder="Email"
                placeholderTextColor="#BDB3A0"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password
                    ? styles.inputError
                    : null,
                ]}
                placeholder="Password"
                placeholderTextColor="#BDB3A0"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Pressable style={styles.inputButton} onPress={handleSubmit}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.inputButtonText}>Sign In</Text>
                )}
              </Pressable>

              <Pressable
                style={styles.signUpButton}
                onPress={() => navigation.navigate("Sign Up")}
              >
                <Text style={styles.signUpButtonText}>
                  Don't have an account? Sign Up
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F4ECE3",
    justifyContent: "center",
  },
  container: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6F3E37",
    marginBottom: 30,
    lineHeight: 30,
  },
  input: {
    height: 55,
    borderColor: "#A87544",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  error: {
    color: "#D73A4A",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  inputError: {
    borderColor: "#D73A4A",
  },
  inputButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#A87544",
    marginTop: 10,
  },
  inputButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  signUpButtonText: {
    color: "#6F3E37",
    fontWeight: "bold",
  },
});

export default SignInForm;
