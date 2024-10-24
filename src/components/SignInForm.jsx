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

// Validator for fields in sign in form
const signInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Sign-in form component
const SignInForm = ({ navigation }) => {
  const { handleSignIn, error, loading } = useSignIn();

  return (
    <View>
      <Formik
        validationSchema={signInValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSignIn(values.email, values.password)}
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
                touched.password && errors.password ? styles.inputError : null,
              ]}
              placeholder="Password"
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
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.inputButtonText}>Sign in</Text>
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
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: "#d73a4a",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  inputButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0366d6",
  },
  inputButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
});

export default SignInForm;
