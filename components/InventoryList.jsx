import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import NetInfo from "@react-native-community/netinfo";

import InventoryCard from "./inventoryCard";
import { useEffect, useState } from "react";
import { useData } from "../store/store";
import { useRouter } from "expo-router";
import apiFetch from "../utility/apiFetch";
import { URL } from "../constants";

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
          // console.log("Offline — loading cache");

          const cached = await AsyncStorage.getItem("inventory_cache");
          // router.replace({ pathname: "/auth/signIn" });

          if (cached) {
            const parsed = JSON.parse(cached);
            setInventoryItems(parsed);
            setIndexedList(parsed);
            Toast.show({
              type: "info",
              text1: "Could not load current data",
              text2: "Check your internet connection",
            });
          }

          return;
        }

        const data = await apiFetch(
          `${URL}/inventory/items/`,
          router,
        );

        await AsyncStorage.setItem("inventory_cache", JSON.stringify(data));

        setInventoryItems(data);
        setIndexedList(data);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2:
            "Could not load current data. If this persists, contact support",
        });
        // console.error("fetch failed", error);
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
