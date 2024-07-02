import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import {
  Entypo,
  FontAwesome6,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import NavBar from "../../components/Navbar";
import RecentDeliveries from "./Deliveries";
import Logout from "./Logout";
import PastOrders from "./pastOrders";
import Settings from "./settings";
import TrackOrders from "../TrackOrder/TrackOrders";
import ProfileItem from "../../components/profileItem";
import AboutUs from "../AboutUs";
import ContactUs from "../ContactUs";
import OurTeam from "../OurTeam";
import storageService from "../../utils/storageService";
import Loader from "../../components/Loader";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const UserName = await storageService.get("Name");
        setName(UserName);
        const UserImage = await storageService.get("Image");
        setImage(UserImage);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    getData();
  }, []);
  const ProfileList = [
    {
      Icon: <Entypo name="back-in-time" size={24} color="black" />,
      Text: "My Orders",
      Page: <PastOrders handelPress={() => handlePress(null)} />,
    },
    {
      Icon: <FontAwesome6 name="location-dot" size={24} color="black" />,
      Text: "Track Orders",
      Page: (
        <TrackOrders
          handelPress={() => handlePress(null)}
          navigation={navigation}
        />
      ),
    },
    {
      Icon: <AntDesign name="bars" size={24} color="black" />,
      Text: "Previous Deliveries",
      Page: (
        <RecentDeliveries
          handelPress={() => handlePress(null)}
          navigation={navigation}
        />
      ),
    },
    {
      Icon: <Ionicons name="settings-sharp" size={24} color="black" />,
      Text: "Settings",
      Page: (
        <Settings
          navigation={navigation}
          handelPress={() => handlePress(null)}
        />
      ),
    },
    {
      Icon: <MaterialIcons name="info" size={24} color="black" />,
      Text: "About",
      Page: <AboutUs handelPress={() => handlePress(null)} />,
    },
    {
      Icon: <MaterialIcons name="contact-support" size={24} color="black" />,
      Text: "Contact US",
      Page: <ContactUs handelPress={() => handlePress(null)} />,
    },
    {
      Icon: <MaterialIcons name="people" size={24} color="black" />,
      Text: "OurTeam",
      Page: <OurTeam handelPress={() => handlePress(null)} />,
    },
    {
      Icon: <MaterialIcons name="logout" size={24} color="black" />,
      Text: "Logout",
      Page: (
        <Logout handelPress={() => handlePress(null)} navigation={navigation} />
      ),
    },
  ];

  const [activePage, setActivePage] = useState(null);

  function handlePress(item) {
    setActivePage(item);
  }

  return (
    <>
      <View style={styles.container}>
        {loading && <Loader />}
        {!activePage ? (
          <View>
            <View style={styles.titleContainer}>
              <Image
                source={
                  image != null
                    ? { uri: image }
                    : require("../../assets/images/profile.jpg")
                }
                style={styles.img}
              />
              <Text style={styles.text}>Hello {name}</Text>
            </View>
            <FlatList
              data={ProfileList}
              renderItem={({ item }) => (
                <ProfileItem
                  Icon={item.Icon}
                  Title={item.Text}
                  Page={item.Page}
                  setActive={handlePress}
                />
              )}
              contentContainerStyle={styles.flatListContent}
              keyExtractor={(item) => Math.random() * 100}
            />
          </View>
        ) : (
          activePage
        )}
      </View>
      <NavBar navigation={navigation} active={"Profile"} />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  img: {
    marginRight: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
