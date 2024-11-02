import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import useSubmitReview from "../hooks/useSubmitReview";
import { useNotification } from "../contexts/NotificationContext";

// Validation schema for review form
const reviewValidationSchema = yup.object().shape({
  reviewText: yup.string().required("Review text is required"),
});

// Review form component
const ReviewForm = ({ selectedShop, setReviewFormVisible }) => {
  const { handleSubmitReview, loading } = useSubmitReview();
  const { addNotification } = useNotification();

  // Handle review form submit
  const onSubmit = (values) => {
    const reviewSubmitted = handleSubmitReview(
      selectedShop.fsq_id,
      selectedShop.name,
      selectedShop.location.address || "No address available.",
      values.reviewText,
      () => {
        setReviewFormVisible(false);
      }
    );
    if (reviewSubmitted) {
      addNotification("Review submitted successfully!", "success");
    } else {
      addNotification("Error submitting review. Please try again.", "error");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={{ reviewText: "" }}
        validationSchema={reviewValidationSchema}
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
                touched.reviewText && errors.reviewText
                  ? styles.inputError
                  : null,
              ]}
              placeholder="Write your review here..."
              placeholderTextColor="#BDB3A0"
              onChangeText={handleChange("reviewText")}
              onBlur={handleBlur("reviewText")}
              value={values.reviewText}
              multiline
            />
            {errors.reviewText && touched.reviewText && (
              <Text style={styles.error}>{errors.reviewText}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Submit Review</Text>
                )}
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setReviewFormVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    height: 60,
    borderColor: "#A87544",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  error: {
    color: "#D73A4A",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#D73A4A",
  },
  addImageButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#A87544",
    marginBottom: 15,
  },
  addImageButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 180,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#A87544",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 180,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#6F3E37",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReviewForm;
