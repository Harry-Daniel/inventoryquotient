import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../constants";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import apiFetch from "../utility/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../store/store";
import { URL } from "../constants";

const ProfileBrief = () => {
  const router = useRouter();
  const { setProfile, profile } = useProfile();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const netState = await NetInfo.fetch();

        if (!netState.isConnected || !netState.isInternetReachable) {
          // console.log("Offline — loading cache");

          const cached = await AsyncStorage.getItem("profile_cache");
          // router.replace({ pathname: "/auth/signIn" });

          if (cached) {
            const parsed = JSON.parse(cached);
            setProfile(parsed);
            Toast.show({
              type: "info",
              text1: "Could not load current data",
              text2: "Check your internet connection",
            });
          }

          return;
        }

        const data = await apiFetch(`http://${URL}/auth/users/me/`, router);

        setProfile(data);
        await AsyncStorage.setItem("profile_cache", JSON.stringify(data));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2:
            "Could not load current data. If this persists, contact support",
        });
        // console.error("fetch failed", error);
        const cached = await AsyncStorage.getItem("profile_cache");

        if (cached) {
          const parsed = JSON.parse(cached);
          setProfile(parsed);
        }

        return;
      }
    };

    getProfile();
  }, []);
  return (
    <View>
      <View>
        <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
          Profile
        </Text>
      </View>
      <View className="flex flex-row items-center gap-7 py-2 justify-center px-4">
        <View className="relative">
          <Image
            source={
              profile.profile_image_url
                ? { uri: profile.profile_image_url }
                : IMAGES.user
            }
            className="w-40 h-40 rounded-full"
          />
        </View>

        <View className="w-[60%] gap-2 ">
          <View>
            <Text className="text-xl font-semibold text-wrap">
              {profile.full_name}
            </Text>
            <Text className="text-sm">{profile.username}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile/editProfile")}
            className="px-4 py-2 rounded-2xl bg-blue-500"
          >
            <Text className="text-center text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileBrief;
