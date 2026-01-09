import { Text, View } from "react-native";
import InventoryCard from "./inventoryCard";
import { useEffect, useState } from "react";
import { useData } from "../store/store";

const InventoryList = () => {
  const { setInventoryItems, inventoryItems } = useData();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://69612cd4e7aa517cb79845d3.mockapi.io/items"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInventoryItems(data);
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
