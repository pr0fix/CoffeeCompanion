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
import useSignUp from "../../hooks/useSignUp";
import { useNotification } from "../../contexts/NotificationContext";

// Validator for fields in sign up form
const signupValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation doesn't match given password"
    )
    .required("Password confirmation is required"),
});

// Sign-up form component
const SignUpForm = ({ navigation }) => {
  const { handleSignUp, error, loading } = useSignUp();
  const { addNotification } = useNotification();

  // Handle sign up form submit
  const onSubmit = async (values) => {
    const signedUp = await handleSignUp(
      values.fullName,
      values.email,
      values.password
    );
    if (signedUp) {
      addNotification(
        `Signed up successfully! Welcome, ${values.fullName}!`,
        "success"
      );
    } else {
      addNotification(`${error}`, "error");
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Create Your CoffeeCompanion Account</Text>
      <View style={styles.container}>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
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
                  touched.fullName && errors.fullName
                    ? styles.inputError
                    : null,
                ]}
                placeholder="Full Name"
                placeholderTextColor="#BDB3A0"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {errors.fullName && touched.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}

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

              <TextInput
                style={[
                  styles.input,
                  touched.passwordConfirm && errors.passwordConfirm
                    ? styles.inputError
                    : null,
                ]}
                placeholder="Password confirmation"
                placeholderTextColor="#BDB3A0"
                secureTextEntry
                onChangeText={handleChange("passwordConfirm")}
                onBlur={handleBlur("passwordConfirm")}
                value={values.passwordConfirm}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <Text style={styles.error}>{errors.passwordConfirm}</Text>
              )}

              <Pressable
                style={styles.inputButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.inputButtonText}>Sign up</Text>
                )}
              </Pressable>
              <Pressable
                style={styles.signInButton}
                onPress={() => navigation.navigate("Sign In")}
              >
                <Text style={styles.signInButtonText}>
                  Already have an account? Sign In
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
    color: "#6F3E37",
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
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  signInButtonText: {
    color: "#6F3E37",
    fontWeight: "bold",
  },
});

export default SignUpForm;
