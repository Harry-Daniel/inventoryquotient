import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../constants";
import { useRouter } from "expo-router";

const HeroImage = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={IMAGES.hero}
      className="h-[30vh] w-[100vw] relative"
      alt="hero images"
    >
      <View className="flex h-full w-full justify-center items-center bg-[#00000055]">
        <View className="bg-[#ffffff50]  flex justify-center items-center rounded-md">
          <Image source={IMAGES.logo} className="w-4 h-4" />
        </View>
        <Text className="text-white font-bold text-3xl">
          Inventory made Easy{" "}
        </Text>
        <Text className="text-white w-[80%] text-center">
          Do you keep forgetting what you own just to end up buying more? Trust
          us to have your back!
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/addItem")}
          className="bg-blue-200 px-2 py-1 rounded-2xl my-2 absolute bottom-8 w-32 justify-center items-center h-10 "
        >
          <Text className="font-semibold text-gray-800 ">Add item</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HeroImage;

const styles = StyleSheet.create({});
