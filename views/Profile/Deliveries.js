import {
  Pressable,
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import Toast from "react-native-toast-message";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SectionTitle from "../../components/SectionTitle";
import { actions } from "../../redux/Order";
import { Asset } from "expo-asset";
import { string } from "yup";
const photo = Asset.fromModule(
  require("../../assets/images/user.png")
).downloadAsync((uri) => uri.uri);
const OrderItem = ({
  order_id,
  order_time,
  status,
  order_zone_from,
  order_zone_to,
  navigation,
  delivery_name,
  delivery_photo,
  delivery_avg_rate,
}) => {
  let date = new Date(order_time);
  date.setHours(date.getHours() + 1);
  const d = new Date();
  const diff = Math.abs(d.getTime() - date.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let Status = "";
  if (status == -1) {
    Status = "Pending";
  } else if (status == 0) {
    Status = "Accepted";
  } else if (status == 1) {
    Status = "Moved";
  } else if (status == 2) {
    Status = "On the way";
  } else if (status == 3) {
    Status = "Delivered";
  }
  const formattedDifference = {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
  };
  /**{"city_from": "Assiut City", "city_to": "Assiut City",
   *  "delivery_id": 1, "order_id": 2, "order_time": "2024-06-25T03:42:43.089",
   *  "status": -1, "zone_from": "Assiut City", "zone_to": "Assiut City"}, */
  function stars() {
    let Stars = "";
    for (let i = 0; i < delivery_avg_rate; i++) {
      Stars += "⭐";
    }
    return Stars;
  }
  return (
    <View style={styles.container}>
      <View style={styles.orderItemHeaderContainer}>
        <Image
          source={{
            uri: delivery_photo == null ? photo._j.uri : delivery_photo,
          }}
          style={styles.orderItemHeaderPhoto}
        />
        <Text style={styles.orderItemHeaderName}>{delivery_name}</Text>
        <Text>{stars()}</Text>
      </View>
      <View style={styles.orderItemContainer}>
        <View style={styles.orderDetails}>
          <Text style={styles.orderId}>Order ID: {order_id}</Text>
          <Text style={styles.customerName}>
            Order Created From{" "}
            {formattedDifference.days > 0 &&
              (formattedDifference.days > 1
                ? formattedDifference.days + " days"
                : formattedDifference.days + " day")}{" "}
            {formattedDifference.hours > 0 &&
              formattedDifference.hours > 1 &&
              formattedDifference.hours + " hours "}
            {formattedDifference.minutes > 0 && formattedDifference.minutes}
            {formattedDifference.minutes > 1 ? " minutes" : " minute"}{" "}
          </Text>
          <Text style={styles.orderStatus}>Status: {Status}</Text>
          <Text style={styles.orderDate}>from: {order_zone_from}</Text>
          <Text style={styles.orderDate}>to: {order_zone_to}</Text>
        </View>
        <View style={styles.actionButton}>
          <Button
            title="View Details"
            onPress={() => {
              navigation.navigate("Details", { order_id });
            }}
          />
        </View>
        {false && <Image source={{ uri: "" }} style={styles.orderImage} />}
      </View>
    </View>
  );
};
function RecentDeliveries({ handelPress, navigation }) {
  const navigation2 = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Deliveries = useSelector((state) => state?.order?.orders);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const data = await dispatch(actions.getAllDeliveries());
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong",
          });
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      setLoading(true);
      getData();
    }, [navigation2])
  );
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{ alignItems: "flex-start", width: "100%" }}
        onPress={handelPress}
      >
        <MaterialIcons name="arrow-back-ios" size={24} />
      </Pressable>
      <SectionTitle title={"Past Deliveries"} />
      {loading && <Loader />}
      <FlatList
        data={Deliveries}
        renderItem={({ item }) => (
          <OrderItem {...item} navigation={navigation} />
        )}
        keyExtractor={(item) => Math.random()}
      />
      <Toast position="top" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderItemHeaderPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  orderItemHeaderName: {
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
  },
  orderDetails: {
    flex: 3,
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
    flex: 1,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
export default RecentDeliveries;
