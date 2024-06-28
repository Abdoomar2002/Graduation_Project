import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import RenderItem from "./RenderOrder";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Asset } from "expo-asset";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { actions } from "../redux/Order";
const image = Asset.fromModule(
  require("../assets/images/profile.jpg")
).downloadAsync((uri) => uri.uri);
export default function RecentOrders({ unrelated = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const Orders = useSelector((state) => state?.order?.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (unrelated == false) await dispatch(actions.displayRelatedOrders());
        else await dispatch(actions.displayUnRelatedOrders());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [dispatch, unrelated]);

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View>
        <Text style={styles.title}>Recent Orders</Text>
      </View>
      <FlatList
        data={Orders}
        renderItem={(item) => <RenderItem item={item.item} image={image} />}
        key={(item) => item.order_id}
        keyExtractor={(item) => item.order_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  orderContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPhoto: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
  btnsCont: {
    paddingHorizontal: "15",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignItems: "center",
  },
  btn: {
    width: 70,
    height: 30,
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
