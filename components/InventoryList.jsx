import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

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
        const netState = await NetInfo.fetch();

        if (!netState.isConnected || !netState.isInternetReachable) {
          console.log("Offline — loading cache");

          const cached = await AsyncStorage.getItem("inventory_cache");
          // Put Toast here informing them that cache is loadin

          if (cached) {
            const parsed = JSON.parse(cached);
            setInventoryItems(parsed);
            setIndexedList(parsed);
          }

          return;
        }

        const data = await apiFetch(
          "http://10.0.2.2:8000/inventory/items/",
          router,
        );

        await AsyncStorage.setItem("inventory_cache", JSON.stringify(data));

        setInventoryItems(data);
        setIndexedList(data);
      } catch (error) {
        // Put Toast here informing them that cache is loadin
        console.error("fetch failed", error);
        const cached = await AsyncStorage.getItem("inventory_cache");

        if (cached) {
          const parsed = JSON.parse(cached);
          setInventoryItems(parsed);
          setIndexedList(parsed);
        }

        return;
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
