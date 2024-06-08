import { View, Text, Pressable, Image, StyleSheet } from "react-native";
function ProfileItem({ Icon, Title, Page, setActive }) {
  function OnPressHandler() {
    setActive(Page);
    // console.log(Page);
  }
  return (
    <Pressable onPress={OnPressHandler} style={styles.container}>
      <View style={styles.img}>{Icon}</View>
      <Text style={styles.text}>{Title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 12,
    marginVertical: 15,
  },
  img: {
    width: "auto",
    height: "auto",
    marginRight: 25,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default ProfileItem;
