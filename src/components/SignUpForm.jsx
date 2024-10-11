import { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { Formik } from "formik";

// Validator for fields in sign up form
const signupValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(30, "Password must be at most 30 characters long"),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation doesn't match given password"
    )
    .required("Password confirmation is required"),
});

const SignUpForm = ({ navigation }) => {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("");

  // Creates an account with email and password
  const handleSignUp = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("signin up")
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <View>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: "", password: "", passwordConfirm: "" }}
        onSubmit={handleSignUp}
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

            <TextInput
              style={[
                styles.input,
                touched.passwordConfirm && errors.passwordConfirm
                  ? styles.inputError
                  : null,
              ]}
              placeholder="Password confirmation"
              secureTextEntry
              onChangeText={handleChange("passwordConfirm")}
              onBlur={handleBlur("passwordConfirm")}
              value={values.passwordConfirm}
            />
            {errors.passwordConfirm && touched.passwordConfirm && (
              <Text style={styles.error}>{errors.passwordConfirm}</Text>
            )}

            <Pressable style={styles.inputButton} onPress={handleSubmit}>
              <Text style={styles.inputButtonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
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
});

export default SignUpForm;
