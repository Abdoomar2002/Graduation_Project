import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Import for icons
import { Asset } from "expo-asset";
const imageUrl = Asset.fromModule(require("../../assets/images/email.png"))
  .downloadAsync()
  .then((asseturi) => asseturi.uri);
function ContactUs({ handelPress }) {
  return (
    <View style={styles.container}>
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
          <TextInput style={styles.textInput} placeholder="Enter your name" />
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput style={styles.textInput} placeholder="Enter your email" />
          <Text style={styles.fieldLabel}>Message:</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Write your message here"
            multiline={true}
            numberOfLines={4}
          />
          <Button title="Send Message" style={styles.submitButton} />
        </View>
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
});

export default ContactUs;
