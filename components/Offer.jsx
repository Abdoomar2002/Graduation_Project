import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { actions as OfferActions } from "../redux/Offer";
import {
  Button,
  Image,
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { actions } from "../redux/Auth";
import Toast from "react-native-toast-message";

function Offer({ order, hide }) {
  const [image, setImage] = useState(order.user_photo);
  const [value, setValue] = useState(order.price);
  const dispatch = useDispatch();

  function sendOffer() {
    const sendData = async () => {
      try {
        const res = await dispatch(actions.displayProfile());
        console.log(res.email);
        await dispatch(
          OfferActions.getOffer({
            orderId: order.order_id,
            value,
            email: res.email,
          })
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Offer sent successfully",
        });
        hide(false);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    sendData();
  }
  return (
    <Modal style={{ backgroundColor: "#95cbf2" }} animationType="slide">
      <ScrollView style={{ flex: 1, margin: 0 }}>
        <View style={styles.Container}>
          <View
            style={{
              backgroundColor: "#fff",
              margin: 50,
              padding: 20,
              borderRadius: 50,
            }}
          >
            <View style={styles.Head}>
              <Image source={{ uri: image }} style={styles.userPhoto} />
              <Text style={{ fontWeight: "700", fontSize: 20 }}>
                {order.user_name}
              </Text>
            </View>
            <View style={styles.description}>
              <Text
                style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}
              >
                Description
              </Text>
              <Text>{order.description}</Text>
            </View>
            <View style={{ alignItems: "center", gap: 8, marginVertical: 10 }}>
              <Text style={styles.location}>
                From:
                {order.order_governorate_from}, {order.order_zone_from},
                {order.order_city_from}, {order.detailes_address_from}
              </Text>
              <MaterialCommunityIcons name="arrow-down" size={24} />
              <Text style={styles.location}>
                To: {order.order_governorate_to}, {order.order_zone_to},{" "}
                {order.order_city_to}, {order.detailes_address_to}
              </Text>
            </View>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text>Currnt Price :{order.price}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#49cc90",
                  padding: 5,
                  borderRadius: 10,
                }}
                onPress={() => setValue(value + 5)}
              >
                <MaterialCommunityIcons name="plus" size={24} />
              </Pressable>
              <Pressable>
                <Text style={{ fontSize: 16 }}>{value}</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#49cc90",
                  padding: 5,
                  borderRadius: 10,
                }}
                onPress={() => setValue((v) => (v > 5 ? v - 5 : v))}
              >
                <MaterialCommunityIcons name="minus" size={24} />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <Button
                title="Cancel"
                color={"#f93e3e"}
                onPress={() => hide(false)}
              />
              <Button
                title="Send Offer"
                color={"#49cc90"}
                onPress={sendOffer}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
export default Offer;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#95cbf2",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 20,
    alignItems: "center",
  },
  Head: {
    width: "80%",
    flexDirection: "row",
    gap: 80,
    alignItems: "center",
    margin: 25,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  userPhoto: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
  description: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  location: {
    fontWeight: "14",
  },
});
