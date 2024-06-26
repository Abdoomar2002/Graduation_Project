import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import validate from "../../utils/validate";
import { actions } from "../../redux/Auth";
import logo from "../../assets/images/Logo.png";
import Loader from "../../components/Loader";
import ImageInput from "../../components/ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const Auth = useSelector((state) => state?.Auth?.data);
  const dispatch = useDispatch();
  const handleLogin = () => {
    const sendData = async () => {
      try {
        const formData = new FormData();
        formData.append("Name", fullName);
        formData.append("Phone", phone);
        formData.append("Email", email);
        formData.append("Password", password);
        image &&
          formData.append("profile_img", {
            uri: image.uri,
            type: "image/png",
            name: "faceImage.png",
          });
        //console.log("hello");
        const response = await dispatch(actions.signUp(formData));
        navigation.navigate("SignIn");
        console.log(response);
      } catch (err) {
        console.error(err.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.data || "Faild",
        });
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    if (validateForm()) sendData();
    else {
      setLoading(false);
    }
  };
  function validateForm() {
    let err = "";
    err += validate.validateEmail(email);
    err += validate.validateName(fullName);
    err += validate.validatePhone(phone);
    //err += validate.validateImage(image);
    err += validate.validatePassword(password, confirmPassword);
    if (err.length > 0) {
      Toast.show({ type: "error", text1: "error", text2: err });
      return false;
    }
    return true;
  }
  function handelSignIn() {
    navigation.navigate("SignIn");
  }
  return (
    <ScrollView>
      {loading && <Loader />}
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Sign Up </Text>
        <ImageInput text={"Select Profile Photo"} setImage={setImage} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad" // Optional: Set keyboard type for phone numbers
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Optional: Set keyboard type for email addresses
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
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

        <Button title="Create account" onPress={handleLogin} />

        <Text style={styles.privacyText}>
          By signing up you agree to our privacy policy.
        </Text>
        <Pressable onPress={handelSignIn}>
          <Text style={styles.createAccount}>
            I already have an account?{" "}
            <Text style={{ color: "#0084ff" }}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
      <Toast position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  img: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0084ff",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  privacyText: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  createAccount: {
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  deliveryLogin: {
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignUp;
