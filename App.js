import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackgroundBase,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image src="./assets/favicon.png" />
        <Text>Hello</Text>
        <ImageBackgroundBase />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
