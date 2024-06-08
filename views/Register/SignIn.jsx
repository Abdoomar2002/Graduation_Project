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
// Import specific icon library for logo if needed (e.g., MaterialCommunityIcons)
import logo from "../../assets/images/Logo.png";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { actions } from "../../redux/Auth";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = () => {
    setIsLoading(true);
    const log = async () => {
      const res = await dispatch(actions.login({ email: username, password }));
      // console.log(res, "hello");
      if (res != null) {
        +navigation.navigate("Home");
      } else
        Alert.alert(
          "Error",
          "Username Or Password is wrong\n Please try again",
          [{ text: "ok", style: "cancel" }, { cancelable: false }]
        );
    };
    log();
  };
  const handleTouch = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Hatley Login</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        style={styles.btn}
        color={"#0084ff"}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Forget");
        }}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </Pressable>
      <Pressable style={styles.createAccount} onPress={handleTouch}>
        <Text style={styles.text}>Create an Account</Text>
      </Pressable>
    </View>
  );
}
SignIn.navigationOptions = {
  headerShown: false,
};
SignIn.options = {
  navigationOptions: {
    headerShown: false,
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    textAlign: "left",
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    borderColor: "#000",
    //borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0084ff",
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
  forgotPassword: {
    marginTop: 100,
    textAlign: "right",
    paddingBottom: 5,
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#0d6efd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
  deliveryLogin: {
    marginTop: 10,
    textAlign: "center",
  },
  img: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  btn: {},
});

export default SignIn;
