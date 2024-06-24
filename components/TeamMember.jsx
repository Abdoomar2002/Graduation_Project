import { View, Text, Image, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
const image = Asset.fromModule(require("../assets/images/Logo.png"))
  .downloadAsync()
  .then((asseturi) => asseturi.uri);
const TeamMember = ({ name, title, imageUrl }) => {
  const photo = image._j.replace("Logo.png", imageUrl);
  return (
    <View style={styles.teamMemberContainer}>
      <Image src={photo} style={styles.teamMemberImage} />
      <Text style={styles.teamMemberName}>{name}</Text>
      <Text style={styles.teamMemberTitle}>{title}</Text>
    </View>
  );
};
export default TeamMember;
const styles = StyleSheet.create({
  teamMemberContainer: {
    justifyContent: "center",
    marginBottom: 20,
    alignItems: "center",
  },
  teamMemberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  teamMemberTitle: {
    fontSize: 14,
  },
});
