// OrderList.js
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/OrderCard";
import NavBar from "../../components/Navbar";
import { actions } from "../../redux/Tracking";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import SectionTitle from "../../components/SectionTitle";
const orders = [
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: "#1a21bf",
    name: "Mohamed Salam",
    rating: 5,
    date: "11/14/2023 at 3:41 AM",
    price: "25$",
    details:
      "Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  // Add more orders as needed
];

const DisplayOrder = ({ navigation, active = false }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const TrackData = useSelector((state) => state?.tracking?.data);
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
    }, [navigate])
  );
  return (
    <>
      {loading && <Loader />}
      <ScrollView contentContainerStyle={styles.container}>
        <SectionTitle title={"Active Orders"} />
        {TrackData.map((order, index) => (
          <OrderCard key={index} order={order} navigation={navigation} />
        ))}
      </ScrollView>
      {!active && <NavBar navigation={navigation} active="Orders" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    paddingBottom: 35,
  },
});

export default DisplayOrder;
