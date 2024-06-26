import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import for icons
import { useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { actions } from "../../redux/Mail";
import validate from "../../utils/validate";
import Loader from "../../components/Loader";

function Report({ id, setModel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const reqBody = {
      toEmail: email,
      phone,
      body: message,
      name,
      order_ID: id,
    };

    try {
      const response = await dispatch(actions.sendEmail(reqBody));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: response.message || "Message sent successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to send message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
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
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.container}>
        {isLoading && <Loader />}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Contact Us</Text>
          <MaterialCommunityIcons
            name="email"
            size={30}
            color="#000"
            style={styles.contactIcon}
          />
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
          <Button
            title="Cancel"
            onPress={() => {
              setModel(false);
            }}
            color={"#f93e3e"}
          />
        </View>
        <Toast />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "white", // Ensure background color to make content visible
    justifyContent: "center",
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
    marginBottom: 10, // Add margin to separate buttons
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
  },
});

export default Report;
