// OrderList.js
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import OrderCard from "../../components/OrderCard";
import NavBar from "../../components/Navbar";

const orders = [
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  // Add more orders as needed
];

const DisplayOrder = ({ navigation, active = false }) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </ScrollView>
      {!active && <NavBar navigation={navigation} active="Orders" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 35,
  },
});

export default DisplayOrder;
