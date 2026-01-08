import { Slot, Redirect } from "expo-router";
import { useAuthetication } from "../../store/store";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/navBar";

export default function ProtectedLayout() {
  const { authenticated } = useAuthetication();
  if (!authenticated) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View>
      <View className="flex-1">
        <Slot />
        <NavBar />
      </View>
    </View>
  );
}
