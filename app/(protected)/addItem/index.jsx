import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const AddItem = () => {
  return (
    <View
      className=" gap-6 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
     <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
        Add Item
      </Text>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
