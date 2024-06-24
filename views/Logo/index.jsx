import { Image, View, StyleSheet, Text } from "react-native";
import logo from "../../assets/images/Logo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import storageService from "../../utils/storageService";

function Logo({ navigation }) {
  useEffect(() => {
    const checkAuthStatus = async () => {
      const isAuth = await storageService.get("isAuth");
      setTimeout(() => {
        if (isAuth == "true") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("SignIn");
        }
      }, 5000);
    };

    checkAuthStatus();
  }, [navigation]);
  return (
    <LinearGradient
      colors={["#fff", "#97BADB"]}
      style={styles.container}
      start={{ x: 0.1, y: 0.2 }}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.foot}>By Team Hatley FCI</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 100,
    height: 800,
    width: "auto",
    color: "white",
  },
  foot: {
    position: "absolute",
    bottom: 30,
  },
  logo: {
    width: 250,
    height: 200,
    objectFit: "contain",
  },
});

export default Logo;
