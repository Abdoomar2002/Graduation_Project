// OrderList.js
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import OrderCard from "../../components/OrderCard";
import NavBar from "../../components/Navbar";

const DisplayOrder = ({ navigation, active = false, orders }) => {
  console.log(orders);
  return (
    <>
      {console.log("hi")}
      <ScrollView contentContainerStyle={styles.container}>
        {orders &&
          orders.map((order, index) => {
            return <OrderCard key={index} order={{ ...order }} />;
          })}
      </ScrollView>
      {!active && <NavBar navigation={navigation} active="Orders" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 35,
  },
});

export default DisplayOrder;
