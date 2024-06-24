import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

import OrderItem from "../../components/OrderItem";

const DeliveryOrdersScreen = () => {
  const [orders, setOrders] = useState([
    {
      orderNumber: 545215,
      from: "helaly",
      to: "azhar",
      id: 1,
      VicType: "Motocycle",
      customer: "Salah Ali",
      price: 25,
      deliveryTime: 15,
      rating: 4.8,
      photo: "profile.jpg",
      distance: 2,
    },
    {
      orderNumber: 545215,
      from: "helaly",
      to: "azhar",
      id: 2,
      VicType: "Motocycle",
      customer: "Ahmed Mohamed",
      price: 20,
      deliveryTime: 20,
      rating: 4.2,
      photo: "user.png",
      distance: 3.5,
    },
    {
      orderNumber: 545215,
      from: "helaly",
      to: "azhar",
      id: 3,
      VicType: "Motocycle",
      customer: "Salem Mahmoud",
      price: 30,
      deliveryTime: 10,
      rating: 5,
      photo: "profile.jpg",
      distance: 1.8,
    },
  ]);

  const handleAcceptOrder = (orderId) => {
    // Simulate accepting the order
    console.log("Order", orderId, "accepted");
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handleDeclineOrder = (orderId) => {
    // Simulate declining the order
    console.log("Order", orderId, "declined");
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderItem
            orderData={item}
            onAccept={() => handleAcceptOrder(item.id)}
            onDecline={() => handleDeclineOrder(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DeliveryOrdersScreen;
