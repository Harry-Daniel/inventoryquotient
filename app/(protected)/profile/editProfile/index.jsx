import isEqual from "lodash.isequal";
import Toast from "react-native-toast-message";
import { z } from "zod";

import * as ImagePicker from "expo-image-picker";

import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { IMAGES, URL } from "../../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../../../../store/store";

const { width, height } = Dimensions.get("screen");
const EditProfile = () => {
  // add use effect for loading profile details from cache

  const imageAssetSchema = z
    .union([
      z.object({
        uri: z.string().min(1),
        width: z.number().positive(),
        height: z.number().positive(),
        type: z.literal("image").optional(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
      }),
      z.string(),
    ])
    .nullish()
    .transform((value) => {
      if (!value) return undefined;
      return typeof value === "string" ? value : value.uri;
    });

  const ProfileSchema = z
    .object({
      profile_image_url: imageAssetSchema,
      username: z.string().min(1, "A username is required"),
    })
    .loose();
  // useStates for form data and errors
  const [existingProfileInfo, setExistingProfileInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { profile } = useProfile();
  const router = useRouter();

  // Picking Image
  const pickImage = async () => {
    Keyboard.dismiss();
    // Ask permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileInfo((prev) => ({
        ...prev,
        profile_image_url: result.assets[0],
      }));
    }
  };
  // console.log(profileInfo);

  const handleSave = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      const existingProfileResult =
        ProfileSchema.safeParse(existingProfileInfo);
      const result = ProfileSchema.safeParse(profileInfo);

      if (!result.success) {
        setErrors(result.error.issues.map((issue) => issue.message));
        return;
      }

      setErrors([]);

      const isSame =
        existingProfileResult.success &&
        isEqual(existingProfileResult.data, result.data);

      if (isSame) {
        Toast.show({
          type: "info",
          text1: "No changes detected",
          text2: "No changes were made",
        });
        router.back();
        return;
      }
      // If not the same now start Patch procresss
      const formData = new FormData();
      const accessToken = await AsyncStorage.getItem("access_token");

      formData.append("username", result.data.username);

      if (
        result.data.profile_image_url &&
        !result.data.profile_image_url.startsWith("http")
      ) {
        formData.append("profile_image", {
          uri: result.data.profile_image_url,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      const response = await fetch(`http://${URL}/auth/users/me/`, {
        method: "PATCH",
        headers: {
          Authorization: `JWT ${accessToken}`, // only this
        },
        body: formData,
      });

      if (!response.ok) {
        const badResponse = await response.json();
        setErrors([badResponse.error]);
        return;
      }

      setErrors([]);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Changes have been saved",
      });

      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Occured",
        text2: "If error continues, report to support",
      });
      router.back();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!profile) {
      router.push("/profile");
      return;
    }

    setExistingProfileInfo(profile);
    setProfileInfo(profile);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className=" gap-8 py-12 flex flex-col bg-white"
        style={{ width: width, height: height }}
      >
        <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
          Edit Profile
        </Text>
        <View className="relative justify-center items-center mx-auto">
          <View className="relative">
            <Image
              source={
                profileInfo.profile_image_url
                  ? {
                      uri:
                        typeof profileInfo.profile_image_url === "string"
                          ? profileInfo.profile_image_url
                          : profileInfo.profile_image_url.uri,
                    }
                  : IMAGES.user
              }
              className="w-40 h-40 rounded-full"
            />
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md elevation-md shadow-black"
            >
              <AntDesign name="camera" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-[4%] gap-8">
          <View>
            <View className="flex flex-row items-center">
              <Text className=" font-semibold text-xl">Username </Text>
              <Text className="text-gray-500">(editable)</Text>
            </View>
            <TextInput
              className="border px-2 rounded-lg border-gray-400 text-gray-500"
              value={profileInfo.username}
              onChangeText={(text) =>
                setProfileInfo((prev) => ({ ...prev, username: text }))
              }
            />
          </View>
          <View>
            <Text className=" font-semibold text-xl">Fullname</Text>
            <TextInput
              className="border px-2 rounded-lg border-gray-400 text-gray-500"
              readOnly
              value={profileInfo.full_name}
            />
          </View>
          <View>
            <Text className=" font-semibold text-xl">Email address</Text>
            <TextInput
              className="border px-2 rounded-lg border-gray-400 text-gray-500"
              readOnly
              value={profileInfo.email}
            />
          </View>
        </View>
        <View>
          <View className="px-[4%]">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-950 flex text-center py-3 my-[8%] "
            >
              <Text className="text-white text-center">
                {isLoading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className="flex gap-2 justify-center items-center
          "
          >
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Text className="text-red-600" key={index}>
                  {error}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
