import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { IMAGES } from "../../../constants";

const { width, height } = Dimensions.get("screen");
const Onboarding = () => {
  return (
    <ImageBackground
      className="justify-between items-center p-12"
      style={{ width: width, height: height }}
      source={IMAGES.authBg}
    >
      <View>
        <Text className=" mx-auto  text-blue-900 text-4xl font-semibold mt-[20%]">
          Welcome Back
        </Text>
        <Text className=" mx-auto  text-blue-900 text-lg font-medium">
          Inventory made simple.
        </Text>
      </View>

      <View className="flex flex-row mb-[20%] gap-4">
        <Pressable className="bg-blue-900 active:scale-[0.97] p-4  rounded-3xl w-[45%]">
          <Text className="text-white m-auto">Sign In</Text>
        </Pressable>
        <Pressable className="bg-blue-900 active:scale-[0.97] p-4  rounded-3xl w-[45%]">
          <Text className="text-white m-auto">Sign Up</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
