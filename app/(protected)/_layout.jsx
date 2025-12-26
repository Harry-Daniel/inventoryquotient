import { Slot, Redirect } from "expo-router";
import { BACKEND } from "../../constants";

export default function ProtectedLayout() {
  if (!BACKEND.authenticated) {
    return <Redirect href="/signIn" />;
  }

  return <Slot />;
}
