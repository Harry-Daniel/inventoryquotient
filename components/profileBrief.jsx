import { View, Text, Image, TouchableOpacity } from "react-native";

import { IMAGES } from "../constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const ProfileBrief = () => {
  const router = useRouter();
  return (
    <View>
      <View>
        <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
          Profile
        </Text>
      </View>
      <View className="flex flex-row items-center gap-7 py-2 justify-center px-4">
        <View className="relative">
          <Image source={IMAGES.authBg} className="w-40 h-40 rounded-full" />
          <TouchableOpacity className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md elevation-md shadow-black">
            <AntDesign name="camera" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-[60%] gap-2 ">
          <View>
            <Text className="text-xl font-semibold text-wrap">
              Karen Mmabilla Adazabra
            </Text>
            <Text className="text-sm">BigMama</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile/editProfile")}
            className="px-4 py-2 rounded-2xl bg-blue-500"
          >
            <Text className="text-center text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileBrief;
