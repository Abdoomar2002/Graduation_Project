import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Asset } from "expo-asset";
const OrderItem = ({ orderData, onAccept, onDecline }) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(() => {
      const imageSource = orderData.photo;
      return imageSource;
    });
  }, [image]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 10,
        }}
      >
        <Text style={{ marginRight: 5 }}>
          <Text style={{ fontWeight: 600 }}>Order Num : </Text>
          {orderData.orderNumber}
        </Text>
        <Text style={{ marginRight: 5 }}>
          <Text style={{ fontWeight: 600 }}>From : </Text>
          {orderData.from}
        </Text>
        <Text style={{ marginRight: 5 }}>
          <Text style={{ fontWeight: 600 }}>To : </Text>
          {orderData.to}
        </Text>
      </View>
      <View style={styles.cont}>
        <View style={{ height: 100, width: 100 }}>
          {image != null ? (
            <Image
              src={`http://192.168.1.13:8081/assets/?unstable_path=.%2Fassets%2Fimages%2F${image}&platform=ios&hash=67014f93ab590c8c10b7ecc200dc8e90`}
              onError={(e) =>
                console.log("Image loading error:", e.nativeEvent.error)
              }
              style={styles.photo}
            />
          ) : (
            <Text>no photo</Text>
          )}
        </View>
        <View>
          <Text style={{ marginVertical: 2 }}>Customer: </Text>
          <Text style={{ marginVertical: 2 }}>Vehicle: </Text>
          <Text style={{ marginVertical: 2 }}>Price: </Text>
          <Text style={{ marginVertical: 2 }}>Delivery Time: </Text>
          <Text style={{ marginVertical: 2 }}>Customer Rating: </Text>
          <Text style={{ marginVertical: 2 }}>Distance: </Text>
        </View>
        <View>
          <Text style={styles.text}>{orderData.customer}</Text>
          <Text style={styles.text}>{orderData.VicType}</Text>
          <Text style={styles.text}>EGP{orderData.price}</Text>
          <Text style={styles.text}>{orderData.deliveryTime} mins</Text>
          <Text style={styles.text}>{orderData.rating}</Text>
          <Text style={styles.text}>{orderData.distance} km</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title="Decline" onPress={onDecline} color="#f00" />
        <Button title="Accept" onPress={onAccept} color="#0f0" />
      </View>
    </View>
  );
};
export default OrderItem;
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#0084ff",
    marginBottom: 50,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  photo: {
    width: 100,
    height: 100,
  },
  cont: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
  },
  text: {
    fontWeight: "600",
    marginVertical: 2,
  },
});
