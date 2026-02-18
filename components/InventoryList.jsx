import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InventoryCard from "./inventoryCard";
import { useEffect, useState } from "react";
import { useData } from "../store/store";
import { useRouter } from "expo-router";

const InventoryList = () => {
  const { setInventoryItems, inventoryItems, setIndexedList } = useData();
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);

      try {
        const token = await AsyncStorage.getItem("access_token");

        // 🚨 No token → go to auth
        if (!token) {
          await AsyncStorage.clear();
          router.replace("/auth");
          return;
        }

        let response = await fetch("http://10.0.2.2:8000/inventory/items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });

        // 🔄 If access token expired → try refresh
        if (response.status === 401) {
          const refreshToken = await AsyncStorage.getItem("refresh_token");

          if (!refreshToken) {
            await AsyncStorage.clear();
            router.replace("/auth");
            return;
          }

          const refreshResponse = await fetch(
            "http://10.0.2.2:8000/auth/jwt/refresh/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            },
          );

          if (!refreshResponse.ok) {
            // ❌ Refresh failed → force logout
            await AsyncStorage.clear();
            router.replace("/auth");
            return;
          }

          const refreshData = await refreshResponse.json();

          // 💾 Save new access token
          await AsyncStorage.setItem("access_token", refreshData.access);

          // 🔁 Retry original request with new token
          response = await fetch("http://10.0.2.2:8000/inventory/items/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${refreshData.access}`,
            },
          });
        }

        const data = await response.json();
        console.log(data);
        // setInventoryItems(data);
        // setIndexedList(data);
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
