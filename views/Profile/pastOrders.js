import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import DisplayOrder from "../DisplayOrder";
import { MaterialIcons } from "@expo/vector-icons";

import SectionTitle from "../../components/SectionTitle";

function PastOrders({ handelPress, navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ alignItems: "flex-start", width: "100%" }}
        onPress={handelPress}
      >
        <MaterialIcons name="arrow-back-ios" size={24} />
      </Pressable>
      <SectionTitle title={"My Orders"} />
      <DisplayOrder navigation={navigation} active={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PastOrders;
