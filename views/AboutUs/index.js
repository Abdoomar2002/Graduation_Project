import { designName } from "expo-device";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
const companyName = "Hatley";
description =
  "At Hatley, we're all about delivering convenience to your doorstep. We understand that time is precious, and that's why we've created a platform that puts the power in your hands. You can place your order, choose from a variety of delivery offers, and enjoy a hassle-free delivery experience. Your satisfaction is our priority, and we're here to make your life easier, one delivery at a time.";
imageUrl = Asset.fromModule(require("../../assets/images/About.png"))
  .downloadAsync()
  .then((assturi) => assturi.uri);
function AboutUs({ handelPress }) {
  return (
    <View style={styles.container}>
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
      >
        <Pressable onPress={handelPress}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text style={[styles.companyName, { color: "#000", fontSize: 25 }]}>
          {" "}
          About Us
        </Text>
      </View>
      <ImageBackground
        src={imageUrl._j}
        style={{
          flex: 1,
          padding: 20,
          marginTop: 10,
          opacity: 5,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
        </View>
        <View style={styles.aboutTextContainer}>
          <Text style={styles.aboutDescription}>{description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  companyName: {
    fontSize: 40,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#fff",
  },
  aboutTextContainer: {
    marginBottom: 20,
    color: "#fff",
  },
  aboutDescription: {
    fontSize: 18,
    lineHeight: 25,
    color: "#fff",
  },
});

export default AboutUs;
