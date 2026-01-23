import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { IMAGES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

const displayPicture = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="relative">
      <Image
        source={image ? { uri: image } : IMAGES.user}
        className="w-40 h-40 rounded-full"
      />
      <TouchableOpacity
        onPress={pickImage}
        className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md elevation-md shadow-black"
      >
        <AntDesign name="camera" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default displayPicture;

const styles = StyleSheet.create({});
