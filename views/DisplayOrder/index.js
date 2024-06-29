// OrderList.js
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/OrderCard";
import NavBar from "../../components/Navbar";
import { actions } from "../../redux/Order";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import SectionTitle from "../../components/SectionTitle";
import { Asset } from "expo-asset";
const Image = Asset.fromModule(
  require("../../assets/images/user.png")
).downloadAsync((uri) => uri.uri);
const DisplayOrder = ({
  navigation,
  active = false,
  trackOrRecent = false,
}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const OrdersData = useSelector((state) => state?.order?.orders);
  const TrackData = useSelector((state) => state?.tracking?.data);
  useFocusEffect(
    useCallback(() => {
      // This will be executed when the screen is focused
      const getRecentData = async () => {
        try {
          const response = await dispatch(actions.getAllForUserOrDelivery());
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      const getTrackData = async () => {
        try {
          const response = await dispatch(actions.getAllForUserOrDelivery());
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      setLoading(true);
      trackOrRecent ? getTrackData() : getRecentData();

      // Clean up function, will be executed when the screen is unfocused
      return () => {};
    }, [navigate])
  );
  return (
    <>
      {loading && <Loader />}
      <ScrollView contentContainerStyle={styles.container}>
        <SectionTitle
          title={!trackOrRecent ? "Active Orders" : "Recent Orders"}
        />

        {trackOrRecent == false ? (
          TrackData.length > 0 ? (
            TrackData.map((order, index) => (
              <OrderCard key={index} order={order} navigation={navigation} />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>No Active Orders </Text>
            </View>
          )
        ) : OrdersData.length > 0 ? (
          OrdersData.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              navigation={navigation}
              trackOrRecent={true}
              photo={Image._j.uri}
            />
          ))
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 16 }}>No Active Orders </Text>
          </View>
        )}
      </ScrollView>
      {!active && <NavBar navigation={navigation} active="Orders" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 15,
    paddingBottom: 35,
  },
});

export default DisplayOrder;
