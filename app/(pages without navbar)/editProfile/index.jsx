import { Dimensions, StyleSheet, Text, View } from "react-native";


const { width, height } = Dimensions.get("screen");
const EditProfile = () => {
  return (
    <View
      className=" gap-6 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <Text>EditProfile</Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
