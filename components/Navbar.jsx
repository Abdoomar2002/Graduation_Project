import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
export default function NavBar({ navigation, active }) {
  const [activePage, setActive] = useState("Home");
  useEffect(() => {
    setActive(active);
  }, []);
  function HandelPress(page) {
    navigation.navigate(page, { flag: true });
    setActive(page);
  }
  return (
    <View style={style.conatiner}>
      <Pressable style={style.imgConatiner} onPress={() => HandelPress("Home")}>
        <FontAwesome
          name="home"
          size={30}
          color={activePage == "Home" ? "#0084ff" : "black"}
          style={style.img}
        />
      </Pressable>
      <Pressable
        style={style.imgConatiner}
        onPress={() => HandelPress("Orders")}
      >
        <FontAwesome
          name="shopping-cart"
          size={30}
          color={activePage == "Orders" ? "#0084ff" : "black"}
          style={style.img}
        />
      </Pressable>

      <Pressable
        style={style.imgConatiner}
        onPress={() => HandelPress("Profile")}
      >
        <MaterialIcons
          name="account-circle"
          size={30}
          color={activePage === "Profile" ? "#0084ff" : "black"}
          style={style.img}
        />
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  img: {},

  imgConatiner: {
    marginVertical: 10,
  },
  conatiner: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#addfff",
    paddingBottom: 0,
    paddingHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  center: {
    backgroundColor: "#addfff",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 80,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 100,
    justifyContent: "center",
    position: "absolute",
    left: "44%",
    bottom: 0,
    zIndex: 99,
  },
});
