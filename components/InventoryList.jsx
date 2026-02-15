import { Text, View } from "react-native";
import InventoryCard from "./inventoryCard";
import { useEffect, useState } from "react";
import { useData } from "../store/store";

const InventoryList = () => {
  const { setInventoryItems, inventoryItems, setIndexedList } = useData();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://10.0.2.2:8000/inventory/items/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInventoryItems(data);
        setIndexedList(data);
      } catch (error) {
        console.error("fetch failed", error);
      }
      setIsLoading(false);
    };

    getItems();
  }, []);

  if (isloading && inventoryItems.length < 1) {
    return <Text className="text-center text-blue-950">Loading...</Text>;
  }
  return (
    <View className="w-auto h-[52vh]">
      <InventoryCard items={inventoryItems} />
    </View>
  );
};

export default InventoryList;
