// OrderDetails.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { actions } from "../redux/Order";
import { actions as TrackingActions } from "../redux/Tracking";
import Loader from "./Loader";

const OrderDetails = ({ route }) => {
  const { order_id } = route.params;
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(1);
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  function handelPress() {
    const sendData = async () => {
      try {
        await dispatch(TrackingActions.UpdateStatus(order.order_id));
        setTrack(-track);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    sendData();
  }
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
  }, [dispatch, track]);
  let status = "";
  if (order.status == -1) {
    status = "Pending";
  } else if (order.status == 0) {
    status = "Accepted";
  } else if (order.status == 1) {
    status = "Moved";
  } else if (order.status == 2) {
    status = "On the way";
  } else if (order.status == 3) {
    status = "Delivered";
  }
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.orderId}>
          Order ID: <Text style={styles.link}>{order.order_id}</Text>
        </Text>
        <Text style={[styles.status, styles.pending]}>{status}</Text>
      </View>
      <Text style={styles.date}>
        Date: {new Date(order.order_time).toLocaleString()}
      </Text>
      <View style={styles.address}>
        <Text style={styles.addressText}>
          From: {order.order_zone_from} , {order.detailes_address_from}
        </Text>
        <Text style={styles.arrow}>➡</Text>
        <Text style={styles.addressText}>
          To: {order.order_zone_to}, {order.detailes_address_to}
        </Text>
      </View>
      <Text style={styles.date}>Price: {order.price}</Text>
      <Text style={styles.date}>Description: {order.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.tracking}>
          <View style={[styles.trackingStep, styles.completedStep]}>
            <Text style={styles.trackingText}>Order Accepted</Text>
          </View>
          <View
            style={[
              styles.trackingStep,
              order.status != -1 ? styles.completedStep : null,
            ]}
          >
            <Text style={styles.trackingText}>Order Moved</Text>
          </View>
          <View
            style={[
              styles.trackingStep,
              order.status >= 1 ? styles.completedStep : null,
            ]}
          >
            <Text style={styles.trackingText}>Order on the way</Text>
          </View>
          <View
            style={[
              styles.trackingStep,
              order.status == 3 ? styles.completedStep : null,
            ]}
          >
            <Text style={styles.trackingText}>Order Delivered</Text>
          </View>
        </View>
        <View>
          <Pressable
            style={[
              styles.trackingStep,
              order.status == -1 && styles.completedStep,
              { cursor: "pointer" },
            ]}
            onPress={handelPress}
          >
            {order.status == -1 && (
              <Text style={[styles.trackingText, styles.completedStep]}>
                Update Status
              </Text>
            )}
          </Pressable>
          <Pressable
            style={[
              styles.trackingStep,
              order.status == 0 && styles.completedStep,
              { cursor: "pointer" },
            ]}
            onPress={handelPress}
          >
            {order.status == 0 && (
              <Text style={[styles.trackingText, styles.completedStep]}>
                Update Status
              </Text>
            )}
          </Pressable>
          <Pressable
            style={[
              styles.trackingStep,
              order.status == 1 && styles.completedStep,
              { cursor: "pointer" },
            ]}
            onPress={handelPress}
          >
            {order.status == 1 && (
              <Text style={[styles.trackingText, styles.completedStep]}>
                Update Status
              </Text>
            )}
          </Pressable>
          <Pressable
            style={[
              styles.trackingStep,
              order.status == 2 && styles.completedStep,
              { cursor: "pointer" },
            ]}
            onPress={handelPress}
          >
            {order.status == 2 && (
              <Text style={[styles.trackingText, styles.completedStep]}>
                Update Status
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      {order.status == 3 && (
        <Text style={styles.completeButtonText}>
          Order Completed Succefully
        </Text>
      )}
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
    color: "#000",
    alignSelf: "center",
    fontSize: 16,
  },
});

export default OrderDetails;
