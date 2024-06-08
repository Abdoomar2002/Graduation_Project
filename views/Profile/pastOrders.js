import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import DisplayOrder from "../DisplayOrder";
import { MaterialIcons } from "@expo/vector-icons";

function PastOrders({ handelPress, navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ alignItems: "flex-start", width: "100%" }}
        onPress={handelPress}
      >
        <MaterialIcons name="arrow-back-ios" size={24} />
      </Pressable>
      <DisplayOrder navigation={navigation} active={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PastOrders;
