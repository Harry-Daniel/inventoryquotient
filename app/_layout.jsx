import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import "../global.css";

import { Slot } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { useAuthetication } from "../store/store";
import { isLoading } from "expo-font";
const RootLayout = () => {
  const { login } = useAuthetication();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        login();
      }
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return <Text>Loading</Text>; // or a spinner <LoadingScreen />
  }

  return <Slot />;
};

export default RootLayout;

const styles = StyleSheet.create({});
