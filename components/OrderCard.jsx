import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Reorder from "../views/MakeOrder/Re-order";
import Report from "../views/Report";

const OrderCard = ({ order }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const date = new Date(order.created);
  date.setHours(date.getHours() + 1);
  const created = date.toLocaleString();
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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{order.order_zone_from} </Text>
          <MaterialIcons name="arrow-right-alt" size={30} />
          <Text style={styles.name}>{order.order_zone_to}</Text>
        </View>
      </View>
      <Text style={styles.orderId}>
        Order ID: <Text style={styles.link}>{order.order_id}</Text>
      </Text>
      <Text style={styles.orderId}>
        Order Status: <Text style={styles.link}>{status}</Text>
      </Text>
      <Text style={styles.date}>Date: {created}</Text>
      <Text style={styles.price}>Price: {order.price}</Text>
      <Text style={styles.details}>
        Details: {order?.description?.substr(0, 25)}...
      </Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={() => setReportModalVisible(true)}
        >
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>

        {order.status === 3 && (
          <TouchableOpacity
            style={styles.buttonReorder}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Re-order</Text>
          </TouchableOpacity>
        )}
        {order.status === -1 && (
          <TouchableOpacity
            style={styles.buttonReport}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
        {order.status === -1 && (
          <TouchableOpacity
            style={styles.buttonReorder}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {modalVisible && <Reorder order={order} setVis={setModalVisible} />}
        {reportModalVisible && (
          <Report id={order.id} setModel={setReportModalVisible} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderId: {
    fontSize: 14,
    marginBottom: 5,
  },
  link: {
    color: "#1e90ff",
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonReport: {
    backgroundColor: "#FF7F7F",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonReorder: {
    backgroundColor: "#87CEFA",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default OrderCard;
