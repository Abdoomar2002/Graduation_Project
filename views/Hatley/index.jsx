import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useCallback, useState } from "react";
import NavBar from "../../components/Navbar";
import RecentOrders from "../../components/RecentOrders";
import logo from "../../assets/images/Logo.png";
import { actions } from "../../redux/Auth";

import storageService from "../../utils/storageService";
import { useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Related");
  const navigation2 = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const response = await dispatch(actions.displayProfile());
          storageService.set("Email", response.email);
          console.log(response.zone_Name);
          response.photo && storageService.set("Image", response.photo);
          storageService.set("Name", response.name);
          storageService.set("Zone", response.zone_Name);
        } catch (err) {
          console.log(err);
          storageService.remove("isAuth");
          navigation.navigate("SignIn");
        }
      };
      getData();
      return () => {};
    }, [navigation2])
  );
  return (
    <View style={style.cont}>
      <View style={style.heading}>
        <Image source={logo} style={style.img} />
        <Text style={style.title}>Welcome</Text>
      </View>
      <View style={style.tabContainer}>
        <TouchableOpacity
          style={[
            style.tabButton,
            selectedTab === "Related" && style.activeTab,
          ]}
          onPress={() => {
            setSelectedTab("Related");
          }}
        >
          <Text style={style.tabText}>Related Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.tabButton,
            selectedTab === "Unrelated" && style.activeTab,
          ]}
          onPress={() => {
            setSelectedTab("Unrelated");
          }}
        >
          <Text style={style.tabText}>Unrelated Order</Text>
        </TouchableOpacity>
      </View>
      <RecentOrders unrelated={selectedTab != "Related"} />
      <Toast position="top" />
      <NavBar navigation={navigation} active="home" />
    </View>
  );
}
const style = StyleSheet.create({
  cont: {
    backgroundColor: "#fff",
    flex: 1,
  },
  tabContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ccc",
    paddingVertical: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#addfff",
    paddingTop: 25,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});
