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
import validate from "../../utils/validate";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/Auth";
function NewPasswordPage({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleResetPassword = () => {
    // Check if passwords match
    let err = validate.validatePassword(password, confirmPassword);
    err += validate.validatePassword(oldPassword, oldPassword);
    if (err.length > 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err,
      });
    } else {
      dispatch(
        actions.setPassword({
          old_password: oldPassword,
          new_password: password,
        })
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password changed successfully",
      });
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
        placeholder="Old Password"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={setOldPassword}
      />
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
      <Toast position="top" />
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
