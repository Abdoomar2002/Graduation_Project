import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import DisplayOrder from "../DisplayOrder";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/Order";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
import SectionTitle from "../../components/SectionTitle";

function PastOrders({ handelPress, navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let OrderData = useSelector((state2) => state2?.order);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(actions.getAll());
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message || "Failed to fetch orders",
        });
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getData();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <Pressable
        style={{ alignItems: "flex-start", width: "100%" }}
        onPress={handelPress}
      >
        <MaterialIcons name="arrow-back-ios" size={24} />
      </Pressable>
      <SectionTitle title={"My Orders"} />
      {console.log(OrderData)}
      {!isLoading && (
        <DisplayOrder
          navigation={navigation}
          active={true}
          orders={OrderData.orders}
        />
      )}
      <Toast />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PastOrders;
