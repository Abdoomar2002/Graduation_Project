import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/Navbar";
import { actions } from "../../redux/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SetNotification from "../../Hub/setNotification";
import storageService from "../../utils/storageService";
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
        console.log(err.message);
      }
    };
    getData();
  }, []);
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
