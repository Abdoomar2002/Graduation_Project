import { View, StyleSheet, Image, Button } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
function ImageInput({ text, setImage = () => {} }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImage(result.assets[0]);
    }
  };
  return (
    <View style={styles.picker}>
      <Button title={text} onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
    </View>
  );
}
export default ImageInput;
const styles = StyleSheet.create({
  picker: {
    //  height: 50,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 15,
  },
});
