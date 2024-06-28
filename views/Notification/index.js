import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

import OrderItem from "../../components/OrderItem";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/Offer";
import storageService from "../../utils/storageService";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
const DeliveryOrdersScreen = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const offers = await storageService.get("Offer");
        const offersData = JSON.parse(offers);
        // console.log(offers);
        setOrders(offersData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    getData();
  }, []);
  const handleAcceptOrder = (orderId) => {
    // Simulate accepting the order
    console.log("Order", orderId, "accepted");
    const sendData = async () => {
      try {
        await dispatch(
          actions.acceptOffer({
            orderId: orderId.order_id,
            price: orderId.offer_value,
            email: orderId.delivery_email,
          })
        );
        Toast.show({
          type: "success",
          text1: "Order accepted",
        });
        const storage = await storageService.get("Offer");
        let data = JSON.parse(storage);
        data = data.filter((order) => order.order_id !== orderId.order_id);
        await storageService.remove("offer");
        await storageService.set("Offer", JSON.stringify(data));
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error accepting order",
          text2: err.message,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    sendData();
    setOrders(orders.filter((order) => order.order_id !== orderId.order_id));
  };

  const handleDeclineOrder = (orderId) => {
    // Simulate accepting the order
    console.log("Order", orderId, "declined");
    const sendData = async () => {
      try {
        await dispatch(
          actions.declineOffer({
            orderId: orderId.order_id,
            price: orderId.offer_value,
            email: orderId.delivery_email,
          })
        );
        Toast.show({
          type: "success",
          text1: "Order Declined",
        });
        setOrders(orders.filter((order) => order !== orderId));
        const storage = await storageService.get("Offer");
        let data = JSON.parse(storage);
        data = data.filter((order) => order !== orderId);
        await storageService.remove("offer");
        await storageService.set("Offer", JSON.stringify(data));
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error accepting order",
          text2: err.message,
        });
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    sendData();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader />}
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderItem
            orderData={item}
            onAccept={handleAcceptOrder}
            onDecline={handleDeclineOrder}
          />
        )}
        keyExtractor={(item) => Math.random()}
      />
      <Toast position="top" />
    </View>
  );
};

export default DeliveryOrdersScreen;
