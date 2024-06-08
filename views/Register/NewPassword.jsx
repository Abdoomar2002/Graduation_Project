import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import logo from "../../assets/images/Logo.png";
function NewPasswordPage({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Check if passwords match
    if (password === confirmPassword) {
      // Passwords match, proceed with password reset
      // You can add your logic here, such as updating the password in the database
      Alert.alert("Success", "Password has been reset successfully.");
      // Navigate to the login page or any other appropriate screen
      navigation.navigate("SignIn");
    } else {
      // Passwords don't match, display an error message
      Alert.alert("Error", "Passwords do not match.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title2}>Set New Password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title2: {
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

export default NewPasswordPage;
