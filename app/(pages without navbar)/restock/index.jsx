import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import InventoryCard from "../../../components/inventoryCard";
import { useData } from "../../../store/store";

const { width, height } = Dimensions.get("screen");

const Restock = () => {
  const { inventoryItems } = useData();
  return (
    <View
      className=" gap-6 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
        Restock List
      </Text>

      <InventoryCard items={inventoryItems}/>
    </View>
  );
};

export default Restock;

const styles = StyleSheet.create({});
