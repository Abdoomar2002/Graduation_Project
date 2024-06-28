import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const OrderCard = ({ order, navigation }) => {
  /**{"city_from": "Assiut City", "city_to": "Assiut City",
   *  "delivery_id": 1, "order_id": 2, "order_time": "2024-06-25T03:42:43.089",
   *  "status": -1, "zone_from": "Assiut City", "zone_to": "Assiut City"}   */
  return (
    <View style={styles.card}>
      <Text style={styles.orderId}>
        Order ID: <Text style={styles.link}>{order.order_id}</Text>
      </Text>
      <Text style={styles.date}>
        Date: {new Date(order.order_time).toLocaleString()}
      </Text>
      <Text style={styles.price}>From: {order.zone_from}</Text>
      <Text style={styles.details}>To: {order.zone_to}</Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonReorder}
          onPress={() =>
            navigation.navigate("Details", { order_id: order.order_id })
          }
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stars: {
    flexDirection: "row",
  },
  star: {
    color: "#FFD700",
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
    justifyContent: "flex-end",
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
