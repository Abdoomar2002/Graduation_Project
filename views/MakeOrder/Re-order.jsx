import MakeOrderPage from ".";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, View } from "react-native";

function Reorder({ order, setVis }) {
  order.order_time = new Date(order.order_time);
  return (
    <Modal
      visible={true}
      style={{
        borderRadius: 20,
        position: "absolute",
        height: "auto",
        width: "auto",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        zIndex: 30,
      }}
    >
      <Pressable
        style={{
          margin: 0,
          marginBottom: -35,
          marginTop: 30,
          marginLeft: 30,
          zIndex: 50,
        }}
        onPress={() => {
          setVis(false);
        }}
      >
        <Ionicons name="close" size={24} />
      </Pressable>
      <MakeOrderPage orderData={order} />
    </Modal>
  );
}
export default Reorder;
