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
import OrderCard from "../../components/OrderCard";

const TrackOrderPage = ({ orders, handelPress, navigation }) => {
  const OrderList = orders;
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
          <OrderCard order={item} navigation={navigation} />
        )}
        keyExtractor={(item) => Math.random()}
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
