import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { IMAGES } from "../constants";

const HeroImage = () => {
  return (
    <ImageBackground
      source={IMAGES.hero}
      className="h-[30vh] w-[100vw] relative"
      alt="hero images"
    >
      <View className="flex h-full w-full justify-center items-center bg-[#00000055]">
        <Text className="text-white font-bold text-3xl">
          Inventory made Easy{" "}
        </Text>
        <Text className="text-white w-[80%] text-center">
          Do you keep forgetting what you own just to end up buying more? Trust
          us to have your back!
        </Text>
        <Pressable className="bg-blue-200 px-2 py-1 rounded-2xl my-2 absolute bottom-8 w-32 justify-center items-center h-10 active:scale-90">
          <Text className="font-semibold text-gray-800 ">Add item</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default HeroImage;

const styles = StyleSheet.create({});
