import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
import RNPickerSelect from "react-native-picker-select";
import ImageInput from "../../components/ImagePicker";
import storageService from "../../utils/storageService";
import { useDispatch, useSelector } from "react-redux";
import { actions as AuthActions } from "../../redux/Auth";
import { actions as ZoneActions } from "../../redux/Zone";
import { actions as GovernateAction } from "../../redux/Governate";
import Loader from "../../components/Loader";
const defaultImage = Asset.fromModule(
  require("../../assets/images/profile.jpg")
)
  .downloadAsync()
  .then((asset) => asset.uri);
const Settings = ({ handelPress, navigation }) => {
  const auth = useSelector((state) => state?.auth?.data);
  const Zone = useSelector((state) => state?.zone?.data);
  const Governate = useSelector((state) => state?.governate.data);

  const imageUrl = defaultImage._j.replace("profile.jpg", "user.png");
  //const image = auth.face_with_National_ID_img;
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [governate, setGovernate] = useState("");
  const [governateID, setGovernateID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [zone, setZone] = useState("");
  const [zoneID, setZoneID] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await dispatch(AuthActions.displayProfile());
        console.log(data);
        const governate = await dispatch(
          GovernateAction.displayGovernorate(data.governorate_ID)
        );
        const zone = await dispatch(
          ZoneActions.getZonesByGovernateName(governate.name)
        );
        //console.log(zone);
        //console.log(governate);
        //console.log(data);
        setGovernate(governate.name);
        setGovernate(governate.governorate_ID);
        setZone(zone.name);
        setZone(zone.zone_id);
      } catch (error) {
        console.trace(error.message, "me");
        console.error(error.message, "me2");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        await dispatch(ZoneActions.getZonesByGovernateName(governate));
        await dispatch(GovernateAction.displayAllGovernorates());
      } catch (error) {
        console.log(error.message);
      }
    };
    getLocationData();
    // console.log(Zone);
  }, [governate]);
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
    <>
      {!isLoading && auth ? (
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
                value={auth.name}
                editable={editable}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={!editable ? styles.disabledInput : styles.enabledInput}
                value={auth.email}
                editable={editable}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={!editable ? styles.disabledInput : styles.enabledInput}
                value={auth.phone}
                editable={editable}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>National Id:</Text>
              <TextInput
                style={!editable ? styles.disabledInput : styles.enabledInput}
                value={auth.national_id}
                editable={editable}
              />
            </View>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.row}>
              <Text style={styles.label}>Governate:</Text>

              {Governate && (
                <RNPickerSelect
                  onValueChange={(value) => {
                    value && setGovernate(value?.name);
                    value && setGovernateID(value?.governorate_ID);
                  }}
                  value={governate}
                  items={Governate.map((e) => ({
                    label: e.name,
                    value: { ...e },
                  }))}
                  disabled={!editable}
                  itemKey={governateID}
                  key={governateID}
                />
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Zone:</Text>
              {Zone && Zone.length > 1 && (
                <RNPickerSelect
                  value={zone}
                  onValueChange={(value) => setZone(value)}
                  items={
                    Zone &&
                    Zone.map((e) => ({ label: e.name, value: e.zone_id }))
                  }
                  disabled={!editable}
                />
              )}
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
              {
                display: !editable ? "none" : "flex",
                justifyContent: "flex-end",
              },
            ]}
          >
            <Button
              color={"#0000fe"}
              title="Done"
              onPress={() => setEditable(false)}
            />
          </View>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </>
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
