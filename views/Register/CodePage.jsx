import React, { useState, useRef } from "react";
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

function EnterCodePage({ navigation }) {
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleContinue = () => {
    // Validate the entered code
    if ((code + code2 + code3 + code4).length === 4) {
      // Code is valid, navigate to the next page
      Alert.alert("Done", "");
      navigation.navigate("Password");
      // navigation.navigate("NewPasswordPage");
    } else {
      // Code is not valid, display an error message
      alert("Please enter a valid 4-digit code.");
    }
  };

  const handleChangeText = (text, inputRef) => {
    const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    text = a2e(text);
    if (/^[0-9]+$/.test(text)) {
      if (input1Ref == inputRef) {
        setCode(text);
        if (text !== "") input2Ref.current.focus();
      } else if (input2Ref == inputRef) {
        setCode2(text);
        //   console.log();
        if (text !== "") input3Ref.current.focus();
        else input1Ref.current.focus();
      } else if (input3Ref == inputRef) {
        setCode3(text);
        if (text !== "") input4Ref.current.focus();
        else input2Ref.current.focus();
      } else if (input4Ref == inputRef) {
        setCode4(text);
        if (text === "") input3Ref.current.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title2}>Enter Verification Code</Text>
      </View>
      <View style={styles.codeContainer}>
        <TextInput
          ref={input1Ref}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChangeText(text, input2Ref)}
        />
        <TextInput
          ref={input2Ref}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChangeText(text, input3Ref)}
        />
        <TextInput
          ref={input3Ref}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChangeText(text, input4Ref)}
        />
        <TextInput
          ref={input4Ref}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={setCode}
        />
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 24,
    marginRight: 10,
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

export default EnterCodePage;
