import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const catergoriesList = [
    { id: 1, title: "All" },
    { id: 2, title: "Perishables" },
    { id: 3, title: "Non-Perishables" },
    { id: 4, title: "Tools" },
  ];

  return (
    <View className="flex flex-row gap-2 justify-center items-center">
      {catergoriesList.map(({ title, id }) => (
        <Pressable onPress={() => setSelectedCategory(id)} key={id}>
          <Text
            className={`${selectedCategory === id ? "text-blue-500 border-b-blue-500 border-b-[0.5px]" : "text-blue-200"} text-sm `}
          >
            {title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Categories;
