import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/Navbar";

export default function Home({ navigation }) {
  return (
    <View style={style.cont}>
      <Text>Home Page</Text>
      <NavBar navigation={navigation} active="home" />
    </View>
  );
}
const style = StyleSheet.create({
  cont: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
