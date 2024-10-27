import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import useEditProfile from "../hooks/useEditProfile";
import * as ImagePicker from "expo-image-picker";

// Validation schema for edit profile form
const editProfileValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .required("Full name is required"),
});

// Edit profile component
const EditProfile = ({ navigation }) => {
  const { user } = useUser();
  const { handleEditProfile, error, loading } = useEditProfile();
  const { addNotification } = useNotification();
  const [profileImage, setProfileImage] = useState(null);

  // Handle image upload from device
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handle edit profile form submit
  const onSubmit = async (values) => {
    try {
      const changesMade = await handleEditProfile(
        values.fullName,
        profileImage
      );
      if (changesMade) {
        addNotification("Profile updated successfully!", "success");
      } else {
        addNotification("No changes were made to your profile.", "info");
      }
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      addNotification("Profile updating failed!", "error");
      navigation.navigate("Profile");
    }
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

            <View style={styles.imagePickerContainer}>
              {profileImage && (
                <Image source={{ uri: profileImage }} style={styles.image} />
              )}
              <Pressable style={styles.imagePicker} onPress={handleImageUpload}>
                <Text style={styles.submitButtonText}>Pick an image</Text>
              </Pressable>
            </View>

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
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0366d6",
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    alignSelf: "center",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#008000",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfile;
