// OrderDetails.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { actions } from "../redux/Order";
import Loader from "./Loader";
import RateReview from "./Rating";
import Toast from "react-native-toast-message";

const OrderDetails = ({ route }) => {
  const { order_id } = route.params;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(actions.getOrder(order_id));
        setOrder(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.orderId}>
          Order ID: <Text style={styles.link}>{order.order_id}</Text>
        </Text>
        <Text style={[styles.status, styles.pending]}>{order.status}</Text>
      </View>
      <Text style={styles.date}>
        Date: {new Date(order.order_time).toLocaleString()}
      </Text>
      <View style={styles.address}>
        <Text style={styles.addressText}>From: {order.order_zone_from}</Text>
        <Text style={styles.arrow}>➡</Text>
        <Text style={styles.addressText}>To: {order.order_zone_to}</Text>
      </View>
      <View style={styles.tracking}>
        <View style={[styles.trackingStep, styles.completedStep]}>
          <Text style={styles.trackingText}>Order processed</Text>
        </View>
        <View
          style={[
            styles.trackingStep,
            order.status != -1 ? styles.completedStep : null,
          ]}
        >
          <Text style={styles.trackingText}>Order completed</Text>
        </View>
        <View
          style={[
            styles.trackingStep,
            order.status >= 1 ? styles.completedStep : null,
          ]}
        >
          <Text style={styles.trackingText}>Order in route</Text>
        </View>
        <View
          style={[styles.trackingStep, false ? styles.completedStep : null]}
        >
          <Text style={styles.trackingText}>Order Arrived</Text>
        </View>
      </View>
      {order.status == 3 && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.completeButtonText}>Rating</Text>
        </TouchableOpacity>
      )}
      <RateReview
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={order_id}
      />
      <Toast position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#1e90ff",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  uncompleted: {
    color: "red",
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  addressText: {
    fontSize: 14,
    marginRight: 5,
  },
  arrow: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  tracking: {
    height: 300,
    width: 150,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  trackingStep: {
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    paddingVertical: 10,
    marginVertical: 15,
  },
  completedStep: {
    backgroundColor: "#87CEFA",
    borderRadius: 5,
  },
  trackingText: {
    fontSize: 14,
    color: "#000",
  },
  completeButton: {
    backgroundColor: "#87CEFA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OrderDetails;
