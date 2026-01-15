import { Slot, Redirect, usePathname } from "expo-router";
import { useAuthetication } from "../../store/store";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/navBar";

export default function ProtectedLayout() {
  const pathname = usePathname();
  const hideNavbar =
    pathname.includes("editProfile") ||
    pathname.includes("Detail") ||
    pathname.includes("restock");
  const { authenticated } = useAuthetication();
  if (!authenticated) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View>
      <View className="flex-1">
        <Slot />
        {!hideNavbar && <NavBar />}
      </View>
    </View>
  );
}
