import { StyleSheet, Text, View } from "react-native";

export default function SectionTitle({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#084298",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 15,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "medium",
  },
});
