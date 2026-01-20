import { View, Text, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const ImageInput = () => {
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
    <Pressable
      onPress={pickImage}
      className="flex border border-dashed border-gray-400 h-72 rounded-lg justify-center items-center relative "
    >
      {image && (
        <Image
          source={{ uri: image }}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />
      )}
      <Text className="text-white bg-[#00000050] py-2 px-3 rounded-xl absolute left-[35%] top-[35%] z-10">
        {image ? "Change Image" : "Pick an Image"}
      </Text>
    </Pressable>
  );
};

export default ImageInput;
