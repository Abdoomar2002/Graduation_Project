import { useEffect, useState, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/Tracking/actions";
import Loader from "../../components/Loader";
import SectionTitle from "../../components/SectionTitle";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const OrderItem = ({
  order_id,
  order_time,
  status,
  zone_from,
  zone_to,
  navigation,
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
  return (
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
        <Text style={styles.orderDate}>from: {zone_from}</Text>
        <Text style={styles.orderDate}>to: {zone_to}</Text>
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
  );
};

const TrackOrderPage = ({ orders, handelPress, navigation, home = true }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const TrackData = useSelector((state) => state?.tracking?.data);
  const native = useNavigation();
  useFocusEffect(
    useCallback(() => {
      // This will be executed when the screen is focused
      const getData = async () => {
        try {
          const response = await dispatch(actions.getAll());
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };
      setLoading(true);
      getData();

      // Clean up function, will be executed when the screen is unfocused
      return () => {};
    }, [native])
  );
  useEffect(() => {}, [dispatch, navigation, native]);
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {home && (
        <View style={styles.header}>
          <Pressable onPress={handelPress}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={"black"}
            />
          </Pressable>
        </View>
      )}
      <SectionTitle title={"Track Your Orders"} />
      {TrackData?.length > 0 ? (
        <FlatList
          data={TrackData}
          renderItem={({ item }) => (
            <OrderItem {...item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.order_id}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>You have not any Order To tracking</Text>
        </View>
      )}
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
    padding: 10,
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

export default TrackOrderPage;
