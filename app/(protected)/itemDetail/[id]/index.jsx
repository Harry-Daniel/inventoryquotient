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
            className="w-[85%] h-full rounded-[4rem] z-10"
          />
          <View className=" absolute z-[9] top-[1px] w-[85%] h-full bg-white rounded-[4rem]"></View>
          <View className=" absolute z-[8] top-4 w-[85%] h-full bg-[#8eb1c5] rounded-[5rem]"></View>
        </View>
        <Text>Hello World</Text>
      </View>
    </ImageBackground>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
