import { z } from "zod";
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
  View,
} from "react-native";
import { useData } from "../../../../store/store";

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
    image: imageAssetSchema,
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
  });

  // This allows us know if the user navigated using the add item button or the manage inventory button. id==='0' means they used the add item button
  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item = indexedList[id];

  const [itemDetails, setItemDetails] = useState({
    image: item?.image || null,
    title: item?.name || "",
    quantity: item?.inventory.toString() || "",
    storagePlace: item?.description || "",
  });
  const [errors, setErrors] = useState([]);
  // quantity displays when it is a string

  const pickImage = async () => {
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
      setItemDetails((prev) => ({
        ...prev,
        image: result.assets[0],
      }));
    }
  };

  const handleSubmit = () => {
    const result = itemSchema.safeParse(itemDetails);

    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message));
      return;
    }

    setErrors([]);
    console.log(result.data);

    Toast.show({
      type: "success",
      text1: "Success",
      text2: item
        ? `${result.data.title} details updated successfully`
        : `${result.data.title} added successfully`,
    });
    router.back();
  };
  return (
    <View
      className=" gap-12 py-12 flex flex-col"
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

      <View className="px-[4%]">
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-950 flex text-center py-3 my-[8%] "
        >
          <Text className="text-white text-center">Save</Text>
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
  );
};

export default AddItem;

const styles = StyleSheet.create({});
