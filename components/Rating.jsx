// RateReview.js

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Modal } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch } from "react-redux";
import { actions as RatingActions } from "../redux/Rating";
import { actions as CommentActions } from "../redux/Comment";
import Toast from "react-native-toast-message";
import Loader from "./Loader";

const RateReview = ({ modalVisible, setModalVisible, id }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const handleReviewSubmit = () => {
    const sendData = async () => {
      try {
        if (rating > 0) await dispatch(RatingActions.addRate(rating, id));
        console.log("done");
        if (review.length > 0)
          await dispatch(
            CommentActions.createComment({ order_id: id, text: review })
          );
        Toast.show({
          type: "success",
          text1: "Review Submitted Successfully",
        });
        setModalVisible(false);
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err || "Something went wrong",
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    // Handle the review submit logic here
    console.log("Rating:", rating);
    console.log("Review:", review);
    setLoading(true);
    sendData();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {loading && <Loader />}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Rate & Review</Text>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={0}
            size={30}
            onFinishRating={handleRatingCompleted}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your review"
            onChangeText={setReview}
            value={review}
          />
          <Button
            title="Add review"
            onPress={handleReviewSubmit}
            color="#007BFF"
          />
          <Button
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
            color="#FF6347"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
});

export default RateReview;
