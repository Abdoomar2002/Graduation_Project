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
import { actions } from "../../redux/Auth";
import logo from "../../assets/images/Logo.png";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleForgotPassword = () => {
    setIsLoading(true);
    const senddata = async () => {
      try {
        const response = await dispatch(actions.forgetPassword(email));
        Toast.show({
          type: "info",
          text1: "Reset Passwprd",
          text2: "Password reset link sent to your email",
        });
        navigation.navigate("Code", { number: response.data });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Invalid Email",
        });
        setIsLoading(false);
      }
    };
    senddata();
  };

  const handleSignIn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <Toast />
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
