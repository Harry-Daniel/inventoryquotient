import { Slot, Redirect } from "expo-router";
import { useAuthetication } from "../../store/store";

export default function ProtectedLayout() {
  const { authenticated } = useAuthetication();
  if (!authenticated) {
    return <Redirect href="/signIn" />;
  }

  return <Slot />;
}
