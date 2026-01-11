import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { IMAGES } from "../constants";

const ProfileBrief = () => {
  return (
    <View >
      <View>
        <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
          Profile
        </Text>
      </View>
      <View className="flex flex-row items-center gap-7 py-2 justify-center px-4">
        <Image source={IMAGES.authBg} className="w-40 h-40 rounded-full" />
        <View className="w-[60%] gap-2 ">
          <View>
            <Text className="text-xl font-semibold text-wrap">
              Karen Mmabilla Adazabra
            </Text>
            <Text className="text-sm">kmadazabra@gmail.com</Text>
          </View>
          <TouchableOpacity className="px-4 py-2 rounded-2xl bg-blue-500">
            <Text className="text-center text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileBrief;
