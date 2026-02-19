import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InventoryCard from "./inventoryCard";
import { useEffect, useState } from "react";
import { useData } from "../store/store";
import { useRouter } from "expo-router";
import apiFetch from "../utility/apiFetch";

const InventoryList = () => {
  const { setInventoryItems, inventoryItems, setIndexedList } = useData();
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);

      try {
        const data = await apiFetch(
          "http://10.0.2.2:8000/inventory/items/",
          router,
        );
        setInventoryItems(data);
        setIndexedList(data);
      } catch (error) {
        console.error("fetch failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  if (isloading && inventoryItems.length < 1) {
    return <Text className="text-center text-blue-950">Loading...</Text>;
  }
  if (!isloading && inventoryItems.length < 1) {
    return (
      <Text className="text-center text-blue-950">
        Add some items and watch me keep track of them
      </Text>
    );
  }
  return (
    <View className="w-auto h-[52vh]">
      <InventoryCard items={inventoryItems} />
    </View>
  );
};

export default InventoryList;
