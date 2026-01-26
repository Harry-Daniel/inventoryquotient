import {
  Dimensions,
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

const { width, height } = Dimensions.get("screen");
const AddItem = () => {
  const [itemDetails, setItemDetails] = useState({
    image: null,
    title: "",
    quantity: null,
    storagePlace: "",
  });
  // This allows us know if the user navigated using the add item button or the manage inventory button. id==='0' means they used the add item button
  const { id } = useLocalSearchParams();
  const { indexedList } = useData();
  const item = indexedList[id];
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
      <ImageInput />

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
