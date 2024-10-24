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

// Validation schema for review form
const reviewValidationSchema = yup.object().shape({
  reviewText: yup.string().required("Review text is required"),
});

// Review form component
const ReviewForm = ({ selectedShop, setReviewFormVisible }) => {
  const { handleSubmitReview, loading } = useSubmitReview();

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={{ reviewText: "" }}
        validationSchema={reviewValidationSchema}
        onSubmit={(values) =>
          handleSubmitReview(
            selectedShop.fsq_id,
            selectedShop.name,
            selectedShop.location.address || "No address available.",
            values.reviewText,
            () => setReviewFormVisible(false)
          )
        }
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
  },
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 180,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0366d6",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 180,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#C70000",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReviewForm;
