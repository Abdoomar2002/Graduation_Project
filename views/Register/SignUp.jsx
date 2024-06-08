import React, { useEffect, useRef, useState } from "react";
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
import { actions } from "../../redux/Auth";
import logo from "../../assets/images/Logo.png";
import ImageInput from "../../components/ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { default as ZoneAction } from "../../redux/Zone/actions";
import { default as GovernateAction } from "../../redux/Governate/actions";
import RNPickerSelect from "react-native-picker-select";
import validate from "../../utils/validate";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageProfile, setImageProfile] = useState(null);
  const [imageFrontID, setImageFrontID] = useState(null);
  const [imageBackID, setImageBackID] = useState(null);
  const [imageFaceID, setImageFaceID] = useState(null);
  const scrollViewRef = useRef(null);
  const [selectedGovernateValue, setSelectedGovernateValue] = useState(null);
  const [selectedZoneValue, setSelectedZoneValue] = useState();
  const [zoneInputStatus, setZoneInputStatus] = useState(true);
  const [zoneData, setZoneData] = useState([]);
  const [governateData, setGovernateData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Zone = useSelector((state) => state?.zone);
  const Governate = useSelector((state) => state?.governate);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(GovernateAction.displayAllGovernorates());
      if (res != null) {
        console.log(res);
        let names = res.map((e) => {
          return { label: e.name, value: e.governorate_ID };
        });
        //console.log(Governate.data[0].governorate_ID + "no ");
        setGovernateData(names);
      }
    };
    getData();
  }, [dispatch]);

  const handleSignUp = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    if (IsValidData()) {
      reqBody = {
        Name: fullName,
        Phone: phone,
        Email: email,
        Password: password,
        national_id: nationalId,
        Governorate_ID: selectedGovernateValue,
        Zone_ID: selectedZoneValue,
        frontImage: imageFrontID,
        backImage: imageBackID,
        faceImage: imageFaceID,
      };
      const formData = new FormData();
      formData.append("Name", fullName);
      formData.append("Email", email);
      formData.append("Phone", phone);
      formData.append("Password", password);
      formData.append("national_id", nationalId);
      formData.append("Governorate_ID", parseInt(selectedGovernateValue, 10));
      formData.append("Zone_ID", parseInt(selectedZoneValue, 10));
      formData.append("frontImage", {
        uri: imageFrontID.uri,
        type: "image/png",
        name: "frontImage.png",
      });
      formData.append("backImage", {
        uri: imageBackID.uri,
        type: "image/png",
        name: "backImage.png",
      });
      formData.append("faceImage", {
        uri: imageFaceID.uri,
        type: "image/png",
        name: "faceImage.png",
      });
      setIsLoading(true);
      const SendData = async () => {
        try {
          const response = await dispatch(actions.signUp(formData));
          setIsLoading(false);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Your account has been created successfully",
          });
          navigation.navigate("SignIn");
        } catch (error) {
          setIsLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message || "Failed to Create Account",
          });
          console.log(error.message);
        }
        //navigation.navigate("Home");
      };
      SendData();
    }
  };
  function validatePassword() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.length < 8 && !passwordRegex.test(password)) {
      return "Password must be at least 8 characters and contain at least one small letter and one capital letter and digit and symbole";
    } else if (password !== confirmPassword) {
      return "Password and confirm password do not match";
    }
    return "";
  }
  function IsValidData() {
    let Error = "";
    Error += validate.validateName(fullName);
    Error += validate.validatePhone(phone);
    Error += validate.validateNationalID(nationalId);
    Error += validate.validateEmail(email);
    Error += validate.validateImage(imageProfile);
    Error += validate.validateImage(imageFrontID);
    Error += validate.validateImage(imageBackID);
    Error += validate.validateImage(imageFaceID);
    Error += validatePassword();
    if (Error.length > 1) {
      Toast.show({
        position: "top",
        //topOffset: 50,
        type: "error",
        text1: "Error",
        text2: Error,
        text2Style: {
          height: "auto",
        },
      });
      return false;
    }
    return true;
  }
  function handelSignIn() {
    navigation.navigate("SignIn");
  }
  function handleGovernateChange(e) {
    if (e !== null) {
      //console.log(e);
      setSelectedGovernateValue(e);
      setZoneInputStatus(false);
      const getData = async () => {
        const res = await dispatch(ZoneAction.getAll());
        //console.log(res);
        let names = res.map((e) => {
          return { label: e.name, value: e.zone_id };
        });
        // console.log(names);
        setZoneData(names);
      };
      getData();
    }
  }

  return (
    <ScrollView ref={scrollViewRef}>
      {isLoading && <Loader />}
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Sign Up</Text>
        <Toast />
        <ImageInput text={"Select Profile Photo"} setImage={setImageProfile} />
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
          placeholder="National Id"
          value={nationalId}
          onChangeText={setNationalId}
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
        <RNPickerSelect
          onValueChange={(value) => handleGovernateChange(value)}
          items={governateData}
          placeholder={{ label: "Select your Governate", value: null }}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedZoneValue(value)}
          items={zoneData}
          disabled={zoneInputStatus}
          placeholder={{ label: "Select your Zone", value: null }}
          style={pickerSelectStyles}
        />
        <ImageInput text={"Select face id Photo"} setImage={setImageFrontID} />
        <ImageInput text={"Select back id Photo"} setImage={setImageBackID} />
        <ImageInput
          text={"Select your face with face id Photo"}
          setImage={setImageFaceID}
        />

        <Button title="Create account" onPress={handleSignUp} />

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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: "black",
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
export default SignUp;
