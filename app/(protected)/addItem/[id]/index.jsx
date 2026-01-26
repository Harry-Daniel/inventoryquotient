import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImageInput from "../../../../components/addItem/imageInput";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useData } from "../../../../store/store";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("screen");
const AddItem = () => {
  // This allows us know if the user navigated using the add item button or the manage inventory button. id==='0' means they used the add item button

  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item = indexedList[id];

  const [itemDetails, setItemDetails] = useState({
    image: item?.image || null,
    title: item?.name || null,
    quantity: item?.inventory.toString() || null,
    storagePlace: item?.description || null,
  });
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
        image: result.assets[0].uri,
      }));
    }
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
        {itemDetails.image && (
          <Image
            source={{ uri: itemDetails.image }}
            className="w-full h-72 rounded-lg"
            resizeMode="cover"
          />
        )}
        <Text className="text-white bg-[#00000050] py-2 px-3 rounded-xl absolute left-[35%] top-[35%] z-10">
          {itemDetails.image ? "Change Image" : "Pick an Image"}
        </Text>
      </TouchableOpacity>

      

      <View className="px-[4%]">
        <TouchableOpacity className="bg-blue-950 flex text-center py-3 my-[8%] ">
          <Text className="text-white text-center">Save</Text>
        </TouchableOpacity>
      </View>

      {!item && (
        <Text className="text-red-600 text-center">
          {" "}
          The item should not already exist in inventory. Add only
          <Text className="font-bold"> New </Text>items only
        </Text>
      )}
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
