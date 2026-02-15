import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { IMAGES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const InventoryCard = ({ items }) => {
  const router = useRouter();
  const shortenDescription = (text) =>
    text.length > 30 ? text.slice(0, 30) + "..." : text;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/itemDetail/${item.id}`)}
      className="px-5 w-full mt-4"
    >
      <View className="h-28 w-full rounded-xl bg-blue-950 overflow-hidden flex-row shadow-md">
        <Image
          source={{ uri: item.image_url }}
          className="h-full w-[40%]"
          resizeMode="cover"
        />

        <View className="flex-col py-2 px-4 w-[60%] gap-2">
          {/* Hard-coded name */}
          <Text className="text-blue-100 text-lg font-bold">{item.name}</Text>

          {/* Hard-coded quantity */}
          <View className="bg-blue-100 flex-row items-center rounded-md px-2 self-start gap-1">
            <MaterialIcons name="inventory" size={10} color="#1e40af" />
            <Text className="text-blue-800 text-xs font-bold">
              {item.inventory}
            </Text>
          </View>

          {/* Hard-coded location */}
          <Text className="text-blue-200 text-sm">
            {shortenDescription(item.description)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default InventoryCard;
