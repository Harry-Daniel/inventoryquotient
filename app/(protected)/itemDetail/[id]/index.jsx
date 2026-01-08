import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IMAGES } from "../../../../constants";

const { width, height } = Dimensions.get("screen");
const ItemDetail = () => {
  return (
    <ImageBackground
      source={IMAGES.CardDetailBg}
      style={{ width: width, height: height }}
    >
      <View className="flex flex-col my-16 gap-4  h-[100vh]">
        <View className="relative w-full h-[40%] flex items-center">
          <Image
            source={IMAGES.hero}
            alt="Item Image"
            className="w-[90%] h-full rounded-[4rem] z-10"
          />
          <View className=" absolute z-[9] top-[1px] w-[90%] h-full bg-white rounded-[4rem]"></View>
          <View className=" absolute z-[8] top-4 w-[90%] h-full bg-[#2b2e30] rounded-[5rem]"></View>
        </View>
        <View className=" w-full mt-6 px-[5%]">
          <View className="bg-blue-300 px-4 py-2 flex self-start rounded-full min-w-[40%]">
            <Text className="text-lg font-bold text-center text-[#010c30]">
              Tomatoes
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
