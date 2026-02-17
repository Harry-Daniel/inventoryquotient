import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../constants";

const { width, height } = Dimensions.get("screen");
const Onboarding = () => {
  const router = useRouter();

  const onPressSignIn = () => router.replace({ pathname: "/auth/signIn" });

  const onPressSignUp = () => router.replace({ pathname: "/auth/signUp" });

  return (
    <ImageBackground
      className=" items-center p-12 relative"
      style={{ width: width, height: height }}
      source={IMAGES.authBg}
    >
      <View className="flex flex-col justify-center items-center absolute top-[30%] gap-2 ">
        <View className="   justify-center items-center p-4 rounded-2xl ">
          <Image
            source={IMAGES.logo}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        <View>
          <Text className=" mx-auto  text-blue-900 text-4xl font-bold">
            Inventory Quotient
          </Text>
          <Text className=" mx-auto  text-blue-900 text-lg font-medium tracking-widest">
            Inventory made simple.
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-4 absolute bottom-16">
        <TouchableOpacity
          className="bg-blue-900  p-4  rounded-3xl w-[45%]"
          onPress={onPressSignIn}
        >
          <Text className="text-white m-auto">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-900  p-4  rounded-3xl w-[45%]"
          onPress={onPressSignUp}
        >
          <Text className="text-white m-auto">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
