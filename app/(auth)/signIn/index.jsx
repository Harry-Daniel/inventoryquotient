import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const SignIn = () => {
  return (
    <View
      classname="justify-center items-center"
      style={{ width: width, height: height }}
    >
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
