import { StyleSheet, Text, View, Image } from "react-native";
import NavBar from "../../components/Navbar";
import { actions } from "../../redux/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import storageService from "../../utils/storageService";
import TrackOrderPage from "../TrackOrder/TrackOrders";
import Toast from "react-native-toast-message";
import logo from "../../assets/images/Logo.png";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(actions.displayProfile());
        console.log(response);
        storageService.set("Email", response.email);
        storageService.set("Name", response.name);
        storageService.set("Photo", response.email);
      } catch (err) {
        navigation.navigate("SignIn");
        storageService.remove("isAuth");
        //console.log(err.message);
      }
    };
    getData();
  }, [dispatch]);
  return (
    <View style={style.cont}>
      <View style={style.heading}>
        <Image source={logo} style={style.img} />
        <Text style={style.title}>Welcome</Text>
      </View>
      <TrackOrderPage home={false} navigation={navigation} />
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
});
