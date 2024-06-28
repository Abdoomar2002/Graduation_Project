import { Button, StyleSheet, Text, View } from "react-native";
import { actions } from "../../redux/Auth";
import LottieView from "lottie-react-native";
import NotificationMessage from "../../components/notification";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
function Logout({ handelPress, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const Nav = navigation;
  const dispatch = useDispatch();
  function handel() {
    setIsLoading(true);
    const submit = async () => {
      try {
        const response = await dispatch(actions.logout());
        setIsLoading(false);
        navigation.navigate("SignIn");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.message || "Logout successfully",
        });
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Failed to Logout",
        });
      }
    };
    submit();

    //handelPress();
  }
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <Text>if you are sure press here</Text>
      <Button onPress={handel} title="Logout" />
      <Text>If you are not press here</Text>
      <Button onPress={handelPress} title="Back to profile" />
      <Toast />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    },
  },
});
export default Logout;
