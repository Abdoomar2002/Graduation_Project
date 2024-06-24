import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import logo from "../../assets/images/Logo.png";

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    // For example, send a password reset email to the provided email address
    Alert.alert(
      "Password Reset",
      `Password reset instructions have been sent to ${email}`,
      [{ text: "OK", style: "cancel" }],
      { cancelable: false }
    );
    // Navigate back to the sign-in page
    navigation.navigate("Code");
  };

  const handleSignIn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Forgot Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Reset Password"
        onPress={handleForgotPassword}
        color={"#0084ff"}
      />
      <Pressable style={styles.signIn} onPress={handleSignIn}>
        <Text style={styles.text}>Back to Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "left",
    color: "black",
  },
  signIn: {
    marginTop: 20,
    backgroundColor: "#0d6efd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0084ff",
  },
  img: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
});

export default ForgotPassword;
