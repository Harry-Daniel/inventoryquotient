import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../constants";

const apiFetch = async (fetchUrl, router, options = {}) => {
  let token = await AsyncStorage.getItem("access_token");

  if (!token) {
    await AsyncStorage.clear();
    router.replace("/auth");
    return;
  }

  let response = await fetch(fetchUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...options.headers,
    },
  });

  // 🔄 If expired → refresh
  if (response.status === 401) {
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (!refreshToken) {
      await AsyncStorage.clear();
      router.replace("/auth");
      return;
    }

    const refreshResponse = await fetch(
      `${URL}/auth/jwt/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      },
    );

    if (!refreshResponse.ok) {
      await AsyncStorage.clear();
      router.replace("/auth");
      return;
    }

    const refreshData = await refreshResponse.json();
    token = refreshData.access;

    await AsyncStorage.setItem("access_token", token);

    // 🔁 Retry original request
    response = await fetch(fetchUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `JWT ${token}`,
      },
    });
  }

  return response.json();
};

export default apiFetch;
