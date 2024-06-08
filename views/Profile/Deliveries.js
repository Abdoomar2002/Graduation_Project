import { Button, StyleSheet, Text, View } from "react-native";

function RecentDeliveries({ handelPress }) {
  return (
    <View style={styles.container}>
      <Button onPress={handelPress} title="back" />
      <Text>Delivery Page</Text>
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
export default RecentDeliveries;
