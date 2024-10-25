import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useEditProfile from "../hooks/useEditProfile";
import * as yup from "yup";
import { Formik } from "formik";
import { useUser } from "../contexts/UserContext";

// Validation schema for edit profile form
const editProfileValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .required("Full name is required"),
});

const EditProfile = () => {
  const { user } = useUser();
  const { handleEditProfile, error, loading } = useEditProfile();

  const onSubmit = (values) => {
    console.log(values);
    handleEditProfile(values.fullName);
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={editProfileValidationSchema}
        initialValues={{
          fullName: user?.displayName,
        }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                touched.fullName && errors.fullName ? styles.inputError : null,
              ]}
              placeholder="Full Name"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}

            <Pressable
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Confirm</Text>
              )}
            </Pressable>
          </View>
        )}
      </Formik>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  error: {
    color: "#d73a4a",
    marginBottom: 10,
    fontSize: 14,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#0366d6",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfile;
