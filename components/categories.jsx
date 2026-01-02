import { View, Text, Pressable } from "react-native";
import React from "react";

const Categories = () => {
  const catergoriesList = ["All", "Perishables", "Non Perishables", "Tools"];
  return (
    <View className="flex flex-row gap-2 justify-center items-center">
      {catergoriesList.map((category, index) => (
        <Pressable key={index}>
          <Text className="text-black text-sm border-b-[0.5px]">
            {category} 
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Categories;
