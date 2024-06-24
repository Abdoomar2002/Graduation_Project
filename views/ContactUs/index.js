import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { actions } from "../../redux/ContactMail";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Import for icons
import { Asset } from "expo-asset";
import { useDispatch } from "react-redux";
import validate from "../../utils/validate";
import Loader from "../../components/Loader";
const imageUrl = Asset.fromModule(require("../../assets/images/email.png"))
  .downloadAsync()
  .then((asseturi) => asseturi.uri);
const loader = require("../../assets/loader.json");
function ContactUs({ handelPress }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const reqBody = { email, phone, message, name };
    const sendMessage = async () => {
      try {
        const response = await dispatch(actions.sendEmail(reqBody));
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.message || "Message sent successfully",
        });
      } catch (error) {
        setIsLoading(false);

        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Failed to send message",
        });
      }
    };
    sendMessage();
  }
  function validateForm() {
    let validateError = validate.validateName(name);
    validateError += validate.validateEmail(email);
    validateError += validate.validatePhone(phone);
    validateError += validate.validateMessage(message);
    if (validateError.length > 1) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: validateError,
        text2Style: {
          height: "auto",
        },
      });
      return false;
    }
    return true;
  }
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <ImageBackground
        src={imageUrl._j}
        style={{
          flex: 1,
          resizeMode: "center",
          height: 500,

          //  backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <View style={styles.header}>
          <Pressable onPress={handelPress}>
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
          <Text style={styles.pageTitle}>Contact Us</Text>
          <MaterialCommunityIcons
            name="email"
            size={30}
            color="#000"
            style={styles.contactIcon}
          />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoData}>+123 456 7890</Text>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoData}>contact@mycompany.com</Text>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoData}>
            123 Main Street, Anytown, CA 12345
          </Text>
        </View>
        <View style={styles.messageForm}>
          <Text style={styles.fieldLabel}>Your Name:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Text style={styles.fieldLabel}>Your Phone:</Text>
          <TextInput
            style={styles.textInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            textContentType="telephoneNumber"
            placeholder="Enter your Phone Number"
          />
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            placeholder="Enter your email"
          />
          <Text style={styles.fieldLabel}>Message:</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Write your message here"
            multiline={true}
            value={message}
            onChangeText={setMessage}
            numberOfLines={4}
          />
          <Button
            title="Send Message"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
        <Toast />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactIcon: {
    marginLeft: 10,
  },
  contactInfo: {
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoData: {
    fontSize: 16,
    marginBottom: 10,
  },
  messageForm: {
    flex: 1,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#0000f1",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#0000f1",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    height: 100, // Adjust height as needed for multiline input
  },
  submitButton: {
    backgroundColor: "#0f0", // Green color for submit button
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ContactUs;
