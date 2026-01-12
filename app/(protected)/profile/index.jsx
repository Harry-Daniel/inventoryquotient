import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../constants";
import ProfileBrief from "../../../components/profileBrief";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { params } = useLocalSearchParams();
  const iconSize = 20;
  const iconColour = "#374151";
  return (
    <View
      className=" gap-6 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <View className="shadow-black shadow-sm bg-white elevation-md h-[98%] rounded-b-[4rem] gap-2">
        <ProfileBrief />
        <View className="px-4 gap-0.5">

          {/* Favourites */}
          <TouchableOpacity className="flex flex-row items-center justify-between py-4">
            <View className="flex flex-row  gap-3 items-center">
              <FontAwesome name="heart-o" size={iconSize} color={iconColour} />
              <Text className="text-xl text-gray-700">Favourites</Text>
            </View>
            <AntDesign name="right" size={iconSize} color={iconColour} />
          </TouchableOpacity>

{/* Restock List */}
          <TouchableOpacity className="flex flex-row items-center justify-between py-4">
            <View className="flex flex-row  gap-3 items-center">
              <MaterialIcons name="sell" size={24} color="black" />
              <Text className="text-xl text-gray-700">Restock List</Text>
            </View>
            <AntDesign name="right" size={iconSize} color={iconColour} />
          </TouchableOpacity>

          {/* divider */}
          <View className="border-b border-b-[#9ca3af20]"></View>

          {/* Logout */}
          <TouchableOpacity className="flex flex-row items-center justify-between py-4">
            <View className="flex flex-row  gap-3 items-center">
              <MaterialIcons name="logout" size={24} color="red" />
              <Text className="text-xl text-gray-700">Logout</Text>
            </View>
            <AntDesign name="right" size={iconSize} color={iconColour} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
