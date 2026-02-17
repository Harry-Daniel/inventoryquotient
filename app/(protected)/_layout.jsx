import Toast from "react-native-toast-message";
import { Slot, Redirect, usePathname } from "expo-router";

import { useAuthetication } from "../../store/store";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/navBar";
import { StatusBar } from "expo-status-bar";

export default function ProtectedLayout() {
  const pathname = usePathname();
  const hideNavbar =
    pathname.includes("editProfile") ||
    pathname.includes("Detail") ||
    pathname.includes("restock") ||
    pathname.includes("addItem");

  const { authenticated } = useAuthetication();
  if (!authenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <View>
      <View className="flex-1">
        <StatusBar style="dark"/>
        <Slot />
        {!hideNavbar && <NavBar />}
        <Toast />
      </View>
    </View>
  );
}
