import Toast from "react-native-toast-message";
import { Slot, Redirect, usePathname } from "expo-router";

import { useAuthetication } from "../../store/store";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NavBar from "../../components/navBar";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function ProtectedLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  const pathname = usePathname();
  const hideNavbar =
    pathname.includes("editProfile") ||
    pathname.includes("Detail") ||
    pathname.includes("restock") ||
    pathname.includes("addItem");

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  return (
    <View>
      <View className="flex-1">
        <StatusBar style="dark" />
        <Slot />
        {!hideNavbar && <NavBar />}
        <Toast />
      </View>
    </View>
  );
}
