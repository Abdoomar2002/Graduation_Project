import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Asset } from "expo-asset";
import { MaterialIcons } from "@expo/vector-icons";
import { string } from "yup";

const photo = Asset.fromModule(
  require("../assets/images/profile.jpg")
).downloadAsync((uri) => uri);
const OrderCard = ({ order }) => {
  let date = new Date(order.created);
  date.setHours(date.getHours() + 3);
  let created = date.toLocaleString();
  console.log(order, "anything");
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
        Order ID: <Text style={styles.link}>{order.id}</Text>
      </Text>
      <Text style={styles.orderId}>
        Order Status: <Text style={styles.link}>{order.status}</Text>
      </Text>
      <Text style={styles.date}>Date: {created}</Text>
      <Text style={styles.price}>Price: {order.price}</Text>
      <Text style={styles.details}>
        Details: {order.description.substr(0, 25)}
      </Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonReport}>
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReorder}>
          <Text style={styles.buttonText}>Re-order</Text>
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
    flexDirection: "row",
    alignItems: "center",
    gap: "10",
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
