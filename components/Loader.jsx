import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
const spin = require("../assets/loader.json");
function Loader() {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={spin} // Path to your Lottie animation JSON file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
});
export default Loader;
