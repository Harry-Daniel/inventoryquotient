import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const SignIn = () => {
  const { params } = useLocalSearchParams();

  return (
    <View
      className="justify-center items-center p-4 gap-4"
      style={{ width: width, height: height }}
    >
      <Text>Sign In</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
