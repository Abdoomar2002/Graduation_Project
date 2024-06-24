import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
// Import star rating library here (e.g. react-native-star-rating)

const RatingPopup = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRating = (newRating) => setRating(newRating);
  const handleReviewChange = (text) => setReviewText(text);
  const handleSubmit = () => {
    onSubmit({ rating, reviewText });
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>Rate Your Experience</Text>
          <RatingStar selectedRating={rating} onRatingChange={handleRating} />
          <TextInput
            multiline
            placeholder="Enter Your Review"
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            onChangeText={handleReviewChange}
            value={reviewText}
          />
          <Button title="Add Review" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};
export default RatingPopup;
