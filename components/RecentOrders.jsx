import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/Order";
export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const Orders = useSelector((state) => state?.order?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storageServiceValue = await storageService.get("Token");
    };

    checkAuthStatus();
    // Assuming the data is fetched from an API
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(actions.displayRelatedOrders()).then(
        (res) => res
      );
      setOrders(response);
    };
    fetchData();
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>ID: {item.id}</Text>
      <Text style={styles.orderText}>Description: {item.description}</Text>
      <Text style={styles.orderText}>
        From: {item.order_governorate_from}, {item.order_zone_from},{" "}
        {item.order_city_from}
      </Text>
      <Text style={styles.orderText}>
        To: {item.order_governorate_to}, {item.order_zone_to},{" "}
        {item.order_city_to}
      </Text>
      <Text style={styles.orderText}>Price: ${item.price}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
      <Text style={styles.orderText}>User: {item.user_name}</Text>
      {item.user_photo && (
        <Image
          source={{
            uri: item.user_photo.replace(
              "E:\\College\\Graduation project\\Code\\Hatley\\wwwroot\\User_imgs\\",
              "https://your-server.com/User_imgs/"
            ),
          }}
          style={styles.userPhoto}
        />
      )}
      <View style={styles.btnsCont}>
        <Pressable>
          <Text style={[{ backgroundColor: "#fe0421" }, styles.btn]}>
            Ignore
          </Text>
        </Pressable>
        <Pressable>
          <Text style={[{ backgroundColor: "#02ea55" }, styles.btn]}>
            Offer
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Recent Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    borderRadius: 4,
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
