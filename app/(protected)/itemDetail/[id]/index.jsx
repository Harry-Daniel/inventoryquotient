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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useData } from "../../../../store/store";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");
const ItemDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item = indexedList[id];

  return (
    <View className="flex flex-col  h-[100vh]">
      <StatusBar style="light" />
      <View className="relative w-full h-[45%] flex items-center">
        <Image
          source={{ uri: item.image }}
          alt="Item Image"
          className="w-full h-full "
        />
        {/* <View className=" absolute z-[9] top-[1px] w-[90%] h-full bg-white rounded-[4rem]"></View>
          <View className=" absolute z-[8] top-4 w-[90%] h-full bg-[#2b2e30] rounded-[5rem]"></View> */}
      </View>
      <View className="px-[7%] py-[10%] flex gap-10 relative h-[70%] w-full bg-gray-100 rounded-[4rem] -mt-20">
        <View className=" w-full mt-6  flex flex-row items-center justify-between">
          <View className="bg-blue-300 px-4 py-2 flex self-start rounded-full min-w-[40%]">
            <Text className="text-lg font-bold text-center text-[#010c30]">
              {item.name}
            </Text>
          </View>
          <View className="bg-blue-300 px-4 py-2 flex flex-row rounded-full min-w-[20%] justify-center items-center gap-2">
            <MaterialIcons name="inventory" size={14} color="#010c30" />
            <Text className="text-sm font-bold text-[#010c30]">
              {item.inventory}
            </Text>
          </View>
        </View>

        <Text className="leading-6">{item.description}</Text>
        {/* Last Updated */}
        <View className="absolute bottom-32 left-[7%] w-full px-4 gap-8">
          <View className="flex flex-row gap-6 items-center">
            <Image source={IMAGES.hero} className="w-20 h-20 rounded-full" />
            <View className="">
              <Text className="text-xs">Last Updated By:</Text>
              <Text className="font-bold">Pookie</Text>
              <Text className="text-xs">21/02/2025</Text>
            </View>
          </View>
          <View className="gap-2 flex">
            <TouchableOpacity
              className="bg-blue-300  rounded-full py-4 "
              onPress={() => router.push("/addItem")}
            >
              <Text className="text-center font-semibold text-blue-950">
                Manage Inventory
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-950  rounded-full py-4 ">
              <Text className="text-center font-semibold text-white">
                Add to Restock List
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
