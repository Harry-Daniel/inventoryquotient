import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../constants";
import { useState } from "react";

const { width, height } = Dimensions.get("screen");
const SignIn = () => {
  const [userDetails, setUserDetails] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  // simulating on submit
  const handleOnSubmit = () => {
    setErrors([]);
    if (isChecked) {
      console.log("submitted");
    } else {
      setErrors((errors) => [
        ...errors,
        "You need to agree to processing of your data",
      ]);
    }
  };

  return (
    <ImageBackground
      className="justify-center items-center "
      style={{ width: width, height: height }}
      source={IMAGES.authBg}
    >
      <View className="flex-1 bg-white w-[100%] h-[70%] rounded-t-[3rem] p-6 gap-12 translate-y-40">
        <Text className=" mx-auto my-4 text-blue-900 text-2xl font-semibold">
          Get Started
        </Text>
        {/* form fields */}
        <View className="flex gap-8">
          {/* fullname */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">Fullname</Text>
            </View>
            <TextInput
              placeholder="Enter full name"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              returnKeyType="next"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2"
            />
          </View>
          {/* Email */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">Email</Text>
            </View>
            <TextInput
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2"
            />
          </View>
          {/* Password */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">Password</Text>
            </View>
            <View className="flex flex-row relative">
              <TextInput
                placeholder="Enter password"
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 pr-14 flex-1"
              />
              {hidePassword ? (
                <AntDesign
                  name="eye-invisible"
                  size={16}
                  color="#9ca3af"
                  className="absolute right-5 translate-y-[50%] "
                  onPress={() => setHidePassword(false)}
                />
              ) : (
                <AntDesign
                  name="eye"
                  size={16}
                  color="#9ca3af"
                  className="absolute right-5 translate-y-[50%] "
                  onPress={() => setHidePassword(true)}
                />
              )}
            </View>
          </View>
          {/* Agree to terms and Conditions */}
          <View className=" flex justify-start flex-row items-center -my-5">
            <Switch
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
            />
            <Text className="text-sm text-blue-900">
              I agree to the processing of the Provided data
            </Text>
          </View>
        </View>

        <Pressable
          className="bg-blue-900 active:scale-[0.99] p-4  rounded-3xl"
          onPress={handleOnSubmit}
        >
          <Text className="text-white m-auto">Sign Up</Text>
        </Pressable>
        <View className="flex gap-2">
          {errors.length > 0 &&
            errors.map((error, index) => (
              <Text className="text-red-600" key={index}>
                {error}
              </Text>
            ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
