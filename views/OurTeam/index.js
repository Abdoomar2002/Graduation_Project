import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import TeamMember from "../../components/TeamMember";
import { Ionicons } from "@expo/vector-icons";
const teamMembers = [
  { name: "Abdallah Salah", title: "Backend", imageUrl: "user.png" },
  { name: "Rahma Bahaa", title: "Backend", imageUrl: "user.png" },
  {
    name: "Ahmed Ali",
    title: "Frontend Web",
    imageUrl: "user.png",
  },
  {
    name: "Santy Osama",
    title: "Frontend Web",
    imageUrl: "user.png",
  },
  {
    name: "Abdelrahman Omar",
    title: "Frontend Mobile",
    imageUrl: "user.png",
  },
];
function OurTeam({ handelPress }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={handelPress}>
          <Ionicons name="arrow-back" size={30} />
        </Pressable>
        <Text style={styles.pageTitle}>Our Team</Text>
        <Ionicons name="people" size={30} />
      </View>
      <FlatList
        data={teamMembers}
        renderItem={(item) => (
          <TeamMember key={item.item.name} {...item.item} />
        )}
        keyExtractor={(item) => Math.random()}
        contentContainerStyle={styles.teamMembers}
      ></FlatList>
    </View>
  );
}
export default OurTeam;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 50,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  teamMembers: {
    width: "100%",
    flexGrow: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 40,
    columnGap: 50,

    // Distribute team members evenly
  },
});
