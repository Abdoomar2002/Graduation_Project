import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/Auth";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
import { reloadAppAsync } from "expo";
const image = Asset.fromModule(
  require("../../assets/images/user.png")
).downloadAsync((uri) => uri);
const Settings = ({ handelPress, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editImage, seteditImage] = useState(null);
  const [FormData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    photo: "",
  });
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state?.auth?.data);
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    if (editImage) {
      //handleChange("photo", editImage);
      setPhoto(editImage);
    } else seteditImage(null);
  }, [editImage]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(actions.displayProfile());
        setPhoto(response.photo);
        setFormData((res) => {
          const data = { ...response };
          delete data.id;
          return {
            ...data,
          };
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error 2",
          text2: err.message,
        });
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    getData();
  }, []);

  const [editable, setEditable] = useState(false);
  function handelRemove(text) {
    const sendData = async () => {
      try {
        await dispatch(actions.deleteProfile(Auth.id));
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile deleted successfully",
        });
        navigation.navigate("SignIn");
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);

    if (text == "YES I AM SURE") {
      sendData();
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
  function handleEdit() {
    const sendData = async () => {
      try {
        let res = null;

        if (editImage != null) {
          const fd = new FormData();
          fd.append("profile_img", {
            uri: editImage.uri,
            type: "image/jpeg",
            name: "Profile.png",
          });
          res = await dispatch(actions.uploadImage(fd));
        }
        const response = await dispatch(actions.editProfile(Auth.id, FormData));
      } catch (err) {
        Toast.show({ type: "error", text1: "Error", text2: err.message });
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    sendData();
    setEditable(false);
    handelPress();
  }
  function handleChange(id, value) {
    setFormData((old) => {
      return { ...old, [id]: value };
    });
  }
  return (
    <ScrollView style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.top}>
        <Pressable onPress={handelPress}>
          <MaterialIcons name="arrow-back" size={24} color={"black"} />
        </Pressable>
        <Text style={styles.topText}>Settings </Text>
      </View>
      <View style={styles.header}>
        {Auth && !editImage && (
          <Image
            src={photo}
            onError={(e) => setPhoto(image._j.uri)}
            style={styles.profileImage}
          />
        )}
        {editable && (
          <ImageInput text={"Select Profile Photo"} setImage={seteditImage} />
        )}
      </View>
      <View style={styles.userDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={!editable ? Auth?.name : FormData.name}
            onChangeText={(value) => handleChange("name", value)}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={!editable ? Auth?.email : FormData.email}
            onChangeText={(value) => handleChange("email", value)}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={!editable ? styles.disabledInput : styles.enabledInput}
            value={!editable ? Auth?.phone : FormData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            editable={editable}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>password:</Text>
          <TextInput
            style={true ? styles.disabledInput : styles.enabledInput}
            value="00000000000000"
            secureTextEntry={true}
            editable={false}
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
        <Button color={"#0000fe"} title="Done" onPress={handleEdit} />
      </View>
      <Toast position="top" />
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
