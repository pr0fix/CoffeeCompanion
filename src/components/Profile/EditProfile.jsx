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
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useUser } from "../../contexts/UserContext";
import { useNotification } from "../../contexts/NotificationContext";
import useEditProfile from "../../hooks/useEditProfile";

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
  const { handleEditProfile, loading } = useEditProfile();
  const { addNotification } = useNotification();
  const [profileImage, setProfileImage] = useState(user?.photoURL || null);

  // Handle image upload from device
  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (err) {
      addNotification("Image upload failed!", "error");
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
            <View style={styles.imagePickerContainer}>
              <Pressable onPress={handleImageUpload} style={styles.imagePicker}>
                {profileImage ? (
                  <>
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.image}
                    />
                    <View style={styles.cameraIconOverlay}>
                      <Icon name="camera-alt" size={24} color="white" />
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.addImageText}>Add Image</Text>
                    <View style={styles.cameraIconOverlay}>
                      <Icon name="camera-alt" size={24} color="white" />
                    </View>
                  </>
                )}
              </Pressable>
            </View>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                touched.fullName && errors.fullName ? styles.inputError : null,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F4ECE3",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5D3C5",
    shadowColor: "#6F3E37",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6F3E37",
  },
  input: {
    height: 55,
    borderColor: "#A87544",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePicker: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#A87544",
    borderWidth: 2,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#A87544", // Match imagePicker border color
    borderWidth: 2,
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
    borderWidth: 1.5,
    borderColor: "white",
  },
  addImageText: {
    color: "#A87544",
    fontWeight: "bold",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#A87544",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfile;
