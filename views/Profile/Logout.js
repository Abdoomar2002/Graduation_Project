import { Button, StyleSheet, Text, View } from "react-native";
import { actions } from "../../redux/Auth";
import { useDispatch } from "react-redux";

import NotificationMessage from "../../components/notification";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
import { useState } from "react";
function Logout({ handelPress, navigation }) {
  const Nav = navigation;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  function handel() {
    setIsLoading(true);
    const sendData = async () => {
      try {
        const response = await dispatch(actions.logout());
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged out successfully",
          position: "top",
        });
        setTimeout(() => {
          navigation.navigate("SingIn");
        }, 2000);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    sendData();
    navigation.navigate("SignIn");
  }
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <Button onPress={handel} title="back" />
      <Text>Logout Page</Text>
      <NotificationMessage />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Logout;
