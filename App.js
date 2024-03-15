import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackgroundBase,
} from "react-native";
import img from "./assets/images/Logo.png";
import LinearGradient from "react-native-linear-gradient";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={img} style={styles.logo} />
      </View>
      <Text style={styles.foot}>@copyright</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 100,
    height: "100%",
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
