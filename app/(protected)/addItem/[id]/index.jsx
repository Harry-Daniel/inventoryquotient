import { set, z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEqual from "lodash.isequal";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
import { useData } from "../../../../store/store";
import { URL } from "../../../../constants";

const { width, height } = Dimensions.get("screen");
const AddItem = () => {
  const router = useRouter();
  // zod schemas
  const imageAssetSchema = z
    .union([
      // ImagePicker asset
      // Accepts two forms of inputs and transforms them into one, either the imag-picker object or the uri from the existing database element
      z.object({
        uri: z.string().min(1),
        width: z.number().positive(),
        height: z.number().positive(),
        type: z.literal("image").optional(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
      }),

      // Existing DB image (edit mode)
      z.url(),
    ])
    .transform((value) => {
      // Normalize to string (what DB needs)
      if (typeof value === "string") return value;
      return value.uri;
    });

  const itemSchema = z.object({
    title: z.string().trim().min(1, "Title field is required"),
    quantity: z.preprocess(
      (val) => Number(val),
      z
        .number("Quantity should be a number")
        .int()
        .positive("Quantity must be greater than 0"),
    ),
    storagePlace: z
      .string()
      .trim()
      .min(1, "Storage Location Field is required"),
    image: imageAssetSchema,
  });

  // This allows us know if the user navigated using the add item button or the manage inventory button. id==='0' means they used the add item button
  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item = indexedList[id];
  // console.log(item);
  const [existingItemDetails, setexistingItemDetails] = useState({
    image: item?.image_url || undefined,
    title: item?.name || "",
    quantity: item?.inventory.toString() || "",
    storagePlace: item?.description || "",
  });

  const [itemDetails, setItemDetails] = useState({
    image: item?.image_url || undefined,
    title: item?.name || "",
    quantity: item?.inventory.toString() || "",
    storagePlace: item?.description || "",
  });
  const [errors, setErrors] = useState([]);
  // quantity displays when it is a string
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // Ask permission
    Keyboard.dismiss();
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

    // Used conditional statements for whenin edit screen vs add screen
    if (!result.canceled) {
      setItemDetails((prev) => ({
        ...prev,
        image: item ? result.assets[0].uri : result.assets[0],
      }));
    }
  };

  const createItem = async () => {
    setIsLoading(true);
    const result = itemSchema.safeParse(itemDetails);
    try {
      if (!result.success) {
        setErrors(result.error.issues.map((issue) => issue.message));
        // Allowing meaningful message to th user : If no item image is provided, remove iInvalid input from array and put image is required instead
        itemDetails.image
          ? null
          : setErrors((prev) => [
              ...prev.filter((error) => error !== "Invalid input"),
              "Image is required",
            ]);
        setIsLoading(false);

        return;
      }

      const formData = new FormData();
      const accessToken = await AsyncStorage.getItem("access_token");
      formData.append("name", result.data.title);
      formData.append("inventory", result.data.quantity);
      formData.append("description", result.data.storagePlace);

      if (result.data.image && !result.data.image.startsWith("http")) {
        formData.append("image", {
          uri: result.data.image,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch(`http://${URL}/inventory/items/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${accessToken}`, // only this
        },
        body: formData,
      });

      if (!response.ok) {
        const badResponse = await response.json();
        setErrors([badResponse.error]);
        setIsLoading(false);

        return;
      }

      setErrors([]);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${result.data.title} added successfully`,
      });

      setIsLoading(false);
      router.back();

      return;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: item
          ? `${result.data.title} details did not update`
          : `${result.data.title} not added`,
      });
      setIsLoading(false);

      return;
    }
  };

  const updateItem = async () => {
    setIsLoading(true);

    const existingItemResult = itemSchema.safeParse(existingItemDetails);
    const result = itemSchema.safeParse(itemDetails);
    const is_same = isEqual(existingItemResult, result);
    try {
      if (!result.success) {
        setErrors(result.error.issues.map((issue) => issue.message));
        // Allowing meaningful message to th user : If no item image is provided, remove iInvalid input from array and put image is required instead
        itemDetails.image
          ? null
          : setErrors((prev) => [
              ...prev.filter((error) => error !== "Invalid input"),
              "Image is required",
            ]);
        setIsLoading(false);

        return;
      }

      const formData = new FormData();
      const accessToken = await AsyncStorage.getItem("access_token");
      formData.append("name", result.data.title);
      formData.append("inventory", result.data.quantity);
      formData.append("description", result.data.storagePlace);
      formData.append("image_public_id", item.image_public_id);
      // formData.append("image_url", result.data.image);

      if (result.data.image && !result.data.image.startsWith("http")) {
        formData.append("image", {
          uri: result.data.image,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch(
        `http://${URL}/inventory/items/${item.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${accessToken}`, // only this
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const badResponse = await response.json();
        setErrors([badResponse.error]);
        setIsLoading(false);

        return;
      }

      setErrors([]);
      // console.log(result);
      setIsLoading(false);

      is_same
        ? Toast.show({
            type: "info",
            text1: "No changes detected",
            text2: `No changes were made to ${result.data.title}`,
          })
        : Toast.show({
            type: "success",
            text1: "Success",
            text2: `${result.data.title} details updated successfully`,
          });
      router.push("/");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: `${result.data.title} details did not update`,
      });
      setIsLoading(false);

      return;
    }
  };

  const handleSubmit = async () => {
    item ? updateItem() : createItem();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className=" gap-12 py-12 flex flex-col bg-white"
        style={{ width: width, height: height }}
      >
        <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2 ">
          Add Item
        </Text>
        {/* Title of item */}
        <View className="px-[4%]">
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs font-bold">Title</Text>
            </View>
            <TextInput
              value={itemDetails.title}
              onChangeText={(text) =>
                setItemDetails((prev) => ({ ...prev, title: text }))
              }
              placeholder="Enter item name"
              placeholderTextColor="#4b5563"
              autoCapitalize="none"
              autoCorrect={true}
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2"
            />
          </View>
        </View>
        {/* Quantity of item */}
        <View className="px-[4%]">
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs font-bold">Quantity</Text>
            </View>
            <TextInput
              value={itemDetails.quantity}
              onChangeText={(text) =>
                setItemDetails((prev) => ({ ...prev, quantity: text }))
              }
              placeholder="Enter quantity"
              placeholderTextColor="#4b5563"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2"
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Storage Location of item */}
        <View className="px-[4%]">
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs font-bold">Storage Location</Text>
            </View>
            <TextInput
              value={itemDetails.storagePlace}
              onChangeText={(text) =>
                setItemDetails((prev) => ({ ...prev, storagePlace: text }))
              }
              placeholder="Enter storage location"
              placeholderTextColor="#4b5563"
              autoCapitalize="none"
              autoCorrect={true}
              textAlignVertical="top"
              className="border rounded-lg border-gray-400 focus:border-gray-600  text-wrap"
            />
          </View>
        </View>
        {/* Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          className="flex border border-dashed border-gray-400 h-72 rounded-lg justify-center items-center relative "
        >
          {/* if item exists and we are in edit screen displays only uri as default. if in create screen, displays uri element of image object */}
          {itemDetails.image && (
            <Image
              source={{ uri: item ? itemDetails.image : itemDetails.image.uri }}
              className="w-full h-72 rounded-lg"
              resizeMode="cover"
            />
          )}
          <Text className="text-white bg-[#00000050] py-2 px-3 rounded-xl absolute left-[35%] top-[35%] z-10">
            {itemDetails.image ? "Change Image" : "Pick an Image"}
          </Text>
        </TouchableOpacity>
        <View>
          <View className="px-[4%]">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-950 flex text-center py-3 my-[8%] "
            >
              <Text className="text-white text-center">
                {isLoading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.length === 0 && !item && (
            <Text className="text-red-600 text-center">
              {" "}
              The item should not already exist in inventory. Add only
              <Text className="font-bold"> New </Text>items only
            </Text>
          )}
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

export default AddItem;

const styles = StyleSheet.create({});
