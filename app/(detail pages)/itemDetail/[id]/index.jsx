import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useData } from "../../../../store/store";

const { width, height } = Dimensions.get("screen");
const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item= indexedList[id]

  return (
    <ImageBackground
      source={IMAGES.CardDetailBg}
      style={{ width: width, height: height }}
    >
      <View className="flex flex-col my-16 gap-10  h-[100vh]">
        <View className="relative w-full h-[40%] flex items-center">
          <Image
            source={{uri: item.image}}
            alt="Item Image"
            className="w-[90%] h-full rounded-[4rem] z-10"
          />
          <View className=" absolute z-[9] top-[1px] w-[90%] h-full bg-white rounded-[4rem]"></View>
          <View className=" absolute z-[8] top-4 w-[90%] h-full bg-[#2b2e30] rounded-[5rem]"></View>
        </View>
        <View className="px-[7%] flex gap-5 relative h-[60%] w-full">
          <View className=" w-full mt-6  flex flex-row items-center justify-between">
            <View className="bg-blue-300 px-4 py-2 flex self-start rounded-full min-w-[40%]">
              <Text className="text-lg font-bold text-center text-[#010c30]">
                {item.name}
              </Text>
            </View>
            <View className="bg-blue-300 px-4 py-2 flex flex-row rounded-full min-w-[20%] justify-center items-center gap-2">
              <MaterialIcons name="inventory" size={14} color="#010c30" />
              <Text className="text-sm font-bold text-[#010c30]">{item.inventory}</Text>
            </View>
          </View>

          <Text className="leading-6">
            {item.description}
          </Text>

          <TouchableOpacity className="bg-blue-300 absolute bottom-40 rounded-full left-[7%] w-full px-4 py-4">
            <Text className="text-center font-semibold text-blue-950">
              Add to Restock List
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
