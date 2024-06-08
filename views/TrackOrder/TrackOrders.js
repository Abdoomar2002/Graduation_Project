import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import for icons

const orderData = [
  { orderId: 5, customerName: "ahmed", status: "pending", Date: Date.now() },
  {
    orderId: 6,
    customerName: "abdallah",
    status: "completed",
    Date: Date.now(),
  },
  {
    orderId: 7,
    customerName: "abdelrahman",
    status: "cancelled",
    Date: Date.now(),
  },
  { orderId: 8, customerName: "hussin", status: "pending", Date: Date.now() },
];
const OrderItem = ({
  orderId,
  customerName,
  status,
  date,
  imageUrl,
  navigation,
}) => {
  const order = {
    orderId,
    customerName,
    status,
    date,
    imageUrl,
  };
  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
        <Text style={styles.customerName}>{customerName}</Text>
        <Text style={styles.orderStatus}>Status: {status}</Text>
        <Text style={styles.orderDate}>Date: {date}</Text>
      </View>
      <View style={styles.actionButton}>
        <Button
          title="View Details"
          onPress={() => {
            navigation.navigate("Details", { order });
          }}
        />
      </View>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.orderImage} />
      )}
    </View>
  );
};

const TrackOrderPage = ({ orders, handelPress, navigation }) => {
  const OrderList = orders ? orders : orderData;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handelPress}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={"black"} />
        </Pressable>
        <Text style={styles.pageTitle}>Track Your Orders</Text>
      </View>
      <FlatList
        data={OrderList}
        renderItem={({ item }) => (
          <OrderItem {...item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.orderId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  orderItemContainer: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatus: {
    color: "#ff9900", // Orange color for status (can be adjusted based on status)
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
  },
  actionButton: {
    marginLeft: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default TrackOrderPage;
