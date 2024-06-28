import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Asset } from "expo-asset";
const imageDefault = Asset.fromModule(
  require("../assets/images/user.png")
).downloadAsync((uri) => uri.uri);
const OrderItem = ({ orderData, onAccept, onDecline }) => {
  const [image, setImage] = useState(orderData.delivery_photo);
  useEffect(() => {
    setImage(() => {
      const imageSource = orderData.photo;
      return imageSource;
    });
    /**{"order_id":2,"delivery_email":"abdo20omar20@gmail.com",
     * "delivery_name":"Abc","delivery_photo":null,"offer_value":25,
     * "delivery_avg_rate":0,"delivery_count_rate":0},
     */
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
          <Text style={{ fontWeight: "600" }}>Order Num : </Text>
          {orderData.order_id}
        </Text>
      </View>
      <View style={styles.cont}>
        <View style={{ height: 100, width: 100 }}>
          <Image
            source={{ uri: image || imageDefault._j.uri }}
            onError={(e) =>
              console.log("Image loading error:", e.nativeEvent.error)
            }
            style={styles.photo}
          />
        </View>
        <View>
          <Text style={{ marginVertical: 2, fontWeight: "600" }}>
            Delivery:{" "}
          </Text>

          <Text style={{ marginVertical: 2, fontWeight: "600" }}>Price: </Text>
          <Text style={{ marginVertical: 2, fontWeight: "600" }}>
            Delivery Rating:{" "}
          </Text>
          <Text style={{ marginVertical: 2, fontWeight: "600" }}>
            Recent Orders:{" "}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>{orderData.delivery_name}</Text>
          <Text style={styles.text}>EGP{orderData.offer_value}</Text>

          <Text style={styles.text}>{orderData.delivery_avg_rate}</Text>
          <Text style={styles.text}>{orderData.delivery_count_rate}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          title="Decline"
          onPress={() => onDecline(orderData)}
          color="#f00"
        />
        <Button
          title="Accept"
          onPress={() => onAccept(orderData)}
          color="#0f0"
        />
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
