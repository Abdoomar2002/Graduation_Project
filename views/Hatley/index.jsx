import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect } from "react";
import NavBar from "../../components/Navbar";
import RecentOrders from "../../components/RecentOrders";
import logo from "../../assets/images/Logo.png";

export default function Home({ navigation }) {
  useEffect(() => {}, []);
  return (
    <View style={style.cont}>
      <View style={style.heading}>
        <Image source={logo} style={style.img} />
        <Text style={style.title}>Welcome</Text>
      </View>
      <RecentOrders />
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
