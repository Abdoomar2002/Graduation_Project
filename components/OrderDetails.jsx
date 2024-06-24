// OrderDetails.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const OrderDetails = ({ route }) => {
  const { order } = route.params;
  order.id = "15054";
  order.date = new Date(Date.now()).toUTCString();
  order.from = "elgendy street";
  order.to = "elhelaly street";
  order.status = "Pending";
  const isCompleted = order.status === "Completed";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>
          Order ID: <Text style={styles.link}>{order.id}</Text>
        </Text>
        <Text
          style={[
            styles.status,
            isCompleted
              ? styles.completed
              : order.status === "Pending"
              ? styles.pending
              : styles.uncompleted,
          ]}
        >
          {order.status}
        </Text>
      </View>
      <Text style={styles.date}>Date: {order.date}</Text>
      <View style={styles.address}>
        <Text style={styles.addressText}>From: {order.from}</Text>
        <Text style={styles.arrow}>➡</Text>
        <Text style={styles.addressText}>To: {order.to}</Text>
      </View>
      <View style={styles.tracking}>
        <View style={[styles.trackingStep, styles.completedStep]}>
          <Text style={styles.trackingText}>Order processed</Text>
        </View>
        <View
          style={[
            styles.trackingStep,
            order.status !== "Pending" ? styles.completedStep : null,
          ]}
        >
          <Text style={styles.trackingText}>Order completed</Text>
        </View>
        <View
          style={[
            styles.trackingStep,
            isCompleted || order.status === "In Route"
              ? styles.completedStep
              : null,
          ]}
        >
          <Text style={styles.trackingText}>Order in route</Text>
        </View>
        <View
          style={[
            styles.trackingStep,
            isCompleted ? styles.completedStep : null,
          ]}
        >
          <Text style={styles.trackingText}>Order Arrived</Text>
        </View>
      </View>
      {isCompleted && (
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Rating</Text>
        </TouchableOpacity>
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
    color: "#fff",
    fontSize: 16,
  },
});

export default OrderDetails;
