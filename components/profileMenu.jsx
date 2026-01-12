import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthetication } from "../store/store";

const ProfileMenu = () => {
  // store
  const { logout } = useAuthetication();

  //local constants
  const iconSize = 20;
  const iconColour = "#374151";
  return (
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
      <TouchableOpacity
        onPress={() => logout()}
        className="flex flex-row items-center justify-between py-4"
      >
        <View className="flex flex-row  gap-3 items-center">
          <MaterialIcons name="logout" size={24} color="red" />
          <Text className="text-xl text-gray-700">Logout</Text>
        </View>
        <AntDesign name="right" size={iconSize} color={iconColour} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMenu;
