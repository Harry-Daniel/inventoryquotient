import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const AddItem = () => {
  return (
    <View
      className=" gap-6 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <Text>AddItem</Text>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
