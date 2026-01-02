import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { IMAGES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";

const InventoryCard = ({ items }) => {
  return (
    <Pressable className="px-5 w-full mt-4 gap-4">
      {items.map((item, index) => (
        <View
          key={index}
          className={`${index % 2 == 0 ? "flex-row" : "flex-row-reverse"} h-28 w-full rounded-xl bg-blue-950 overflow-hidden flex  gap-0.5  shadow-md shadow-black active:scale-95`}
        >
          <Image
            source={IMAGES.authBg}
            className={`${index % 2 == 0 ? "rounded-l-xl" : "rounded-r-xl"} h-full w-[40%] `}
          />

          <View className="flex-col p-2  w-[60%] overflow-hidden gap-2">
            <View>
              <Text className="text-blue-100 text-lg font-bold ">Tomatoes</Text>
              <View className="bg-blue-100 flex flex-row justify-center items-center rounded-md gap-2 px-2 self-start">
                <MaterialIcons name="inventory" size={10} color="#1e40af" />
                <Text className="text-blue-800 text-xs font-bold">10</Text>
              </View>
            </View>
            <Text className="text-blue-200 flex-wrap w-full text-sm">
              Inside the little cupboard to the left
            </Text>
          </View>
        </View>
      ))}
    </Pressable>
  );
};

export default InventoryCard;
