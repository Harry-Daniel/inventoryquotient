import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const ItemDetail = () => {
  return (
    <View style={{ width: width, height: height }}>
      <View className="flex flex-col my-16 gap-4 bg-gray-100 h-[100vh]">
        <Text>Hello World</Text>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
