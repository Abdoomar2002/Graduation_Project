import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { Asset } from "expo-asset";
import ImageInput from "../../components/ImagePicker";
const userData = {
  name: "Abdelrahamn Omar",
  email: "abdo20omar20@gmail.com",
  phone: "01025784881",
  city: "Assiut",
  address: "18 elgendy street",
  imageUrl: Asset.fromModule(require("../../assets/images/profile.jpg"))
    .downloadAsync()
    .then((asset) => asset.uri),
};
const Settings = ({
  name,
  email,
  phone,
  city,
  address,
  imageUrl,
  handelPress,
  navigation,
}) => {
  name = userData.name;
  email = userData.email;
  phone = userData.phone;
  city = userData.city;
  address = userData.address;
  imageUrl = userData.imageUrl._j.replace("profile.jpg", "user.png");
  const [editable, setEditable] = useState(false);
  function handelRemove(text) {
    if (text == "YES I AM SURE") {
      Alert.alert("Account Deleted", "have a nice day", [
        { text: "ok", style: "cancel" },
      ]);
      navigation.navigate("SignIn");
    } else
      Alert.alert(
        "wrong input",
        "make sure that you have entred the samr text",
        [{ text: "ok", style: "cancel" }]
      );
  }
  function handelDelete() {
    Alert.prompt(
      "Confirmation",
      "If you are sure write this\nYES I AM SURE",

      [
        {
          text: "Ok",
          style: "cancel",
          onPress: (text) => {
            handelRemove(text);
          },
        },
        { text: "Cancel", style: "default" },
      ]
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Pressable onPress={handelPress}>
          <MaterialIcons name="arrow-back" size={24} color={"black"} />
        </Pressable>
        <Text style={styles.topText}>Settings </Text>
      </View>
      <View style={styles.header}>
        {imageUrl && <Image src={imageUrl} style={styles.profileImage} />}
        {editable && <ImageInput text={"Select Profile Photo"} />}
      </View>
      <View style={styles.userDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={name}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={email}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={phone}
            editable={editable}
          />
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={city}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={address}
            editable={editable}
          />
        </View>
      </View>

      <View
        style={[styles.editButton, { display: editable ? "none" : "flex" }]}
      >
        <Button
          color={"#fe0000"}
          title="Remove Account"
          onPress={handelDelete}
        />
        <Button
          color={"#00fe00"}
          title="Edit information"
          onPress={() => setEditable(true)}
        />
      </View>
      <View
        style={[
          styles.editButton,
          { display: !editable ? "none" : "flex", justifyContent: "flex-end" },
        ]}
      >
        <Button
          color={"#0000fe"}
          title="Done"
          onPress={() => setEditable(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 75,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
  },
  topText: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userDetails: {
    flex: 1,
    gap: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 14,
  },
  userInfo: {
    gap: 10,
    marginBottom: 20,
  },
  userLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  userData: {
    fontSize: 16,
  },
  editButton: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: 100,
    marginRight: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  disabledInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  enabledInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});

export default Settings;
