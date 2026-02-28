import { Dimensions, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InventoryCard from "../../../../components/inventoryCard";
import { useData } from "../../../../store/store";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("screen");

const Restock = () => {
  const [restockList, setRestockList] = useState();
  const { indexedList } = useData();

  useEffect(() => {
    const fetchRestockList = async () => {
      const stored = await AsyncStorage.getItem("restockList");
      const restockIds = stored ? JSON.parse(stored) : [];

      const restockItems = restockIds
        .map((id) => indexedList[id]) // get object by id
        .filter(Boolean); // remove undefined if id not found

      setRestockList(restockItems);
    };

    fetchRestockList();
  }, []);

  return (
    <View
      className=" gap-6 py-12 flex flex-col bg-white"
      style={{ width: width, height: height }}
    >
      <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
        Restock List
      </Text>

      <InventoryCard items={restockList} />
    </View>
  );
};

export default Restock;

const styles = StyleSheet.create({});
