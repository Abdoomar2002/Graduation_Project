// OrderList.js
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import OrderCard from "../../components/OrderCard";
import NavBar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/Order";
import Loader from "../../components/Loader";
import Toast from "react-native-toast-message";

const DisplayOrder = ({ navigation, active = false, show = true }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let OrderData = useSelector((state2) => state2?.order?.orders);
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
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading && <Loader />}
        {!isLoading &&
          OrderData != null &&
          OrderData.map((order, index) => (
            <OrderCard key={index} order={{ ...order }} />
          ))}
      </ScrollView>
      {!active && <NavBar navigation={navigation} active="Orders" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 35,
  },
});

export default DisplayOrder;
