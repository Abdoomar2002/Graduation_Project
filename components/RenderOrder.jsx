import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Offer from "./Offer";

const RenderItem = ({ item, image }) => {
  const [offerModelShowStatus, setOfferModelShowStatus] = useState(false);
  const [photo, setPhoto] = useState(item.photo);
  useEffect(() => {
    if (item.photo != null);
    setPhoto(image._j.uri);
    // if (!item.photo && item.photo.length < 6) setPhoto(image._j.uri);
    // else setPhoto(item.photo);
  }, []);
  let date = new Date(item.created);
  date.setHours(date.getHours() + 1);
  const d = new Date();
  const diff = Math.abs(d.getTime() - date.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const formattedDifference = {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
  };
  return (
    <View style={styles.orderContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: item.photo == null ? image._j.uri : item.photo,
          }}
          style={styles.userPhoto}
        />
        <Text style={{ fontWeight: "600", fontSize: 20 }}>
          {item.user_name}
        </Text>
      </View>

      <Text style={styles.orderText}>
        <Text style={{ fontWeight: "bold" }}>From :</Text>
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
      <Text style={styles.orderText}>
        <Text style={{ fontWeight: "bold" }}>Description: </Text>
        {item.description}
      </Text>
      <Text style={styles.orderText}>
        <Text style={{ fontWeight: "bold" }}>From Address: </Text>
        {item.order_governorate_from}, {item.order_zone_from},{" "}
        {item.order_city_from}, {item.detailes_address_from}
      </Text>
      <Text style={styles.orderText}>
        <Text style={{ fontWeight: "bold" }}>To Address: </Text>{" "}
        {item.order_governorate_to}, {item.order_zone_to}, {item.order_city_to},{" "}
        {item.detailes_address_to}
      </Text>
      <Text style={styles.orderText}>
        <Text style={{ fontWeight: "bold" }}>Price:</Text> ${item.price}
      </Text>

      <View style={styles.btnsCont}>
        <Pressable
          style={{
            borderRadius: 15,
            backgroundColor: "#02ea55",
            borderColor: "#f9f9f9",
            borderWidth: 5,
          }}
          onPress={() => setOfferModelShowStatus(true)}
        >
          <Text
            style={[
              {
                borderRadius: 15,
                borderColor: "#f9f9f9",
              },
              styles.btn,
            ]}
          >
            Offer
          </Text>
        </Pressable>
      </View>
      {offerModelShowStatus && (
        <Offer order={item} hide={setOfferModelShowStatus} />
      )}
    </View>
  );
};
export default RenderItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  orderContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPhoto: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
  btnsCont: {
    paddingHorizontal: "15",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignItems: "center",
  },
  btn: {
    width: 70,
    height: 30,
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
