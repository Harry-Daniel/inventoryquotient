import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { IMAGES, URL } from "../../../constants";
import { useAuthetication } from "../../../store/store";

const { width, height } = Dimensions.get("screen");
const SignIn = () => {
  const signInSchema = z.object({
    email: z.email("Provide a proper email"),

    password: z.string().min(1, "Password is required"),
  });
  const { login } = useAuthetication();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // simulating on submit

  const handleOnSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    const result = signInSchema.safeParse(userDetails);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      setErrors(errorMessages);
      setIsLoading(false);

      return;
    }
    try {
      const response = await fetch(`${URL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const formattedErrors = Object.values(errorData).flat();
        setErrors(formattedErrors);
        setIsLoading(false);

        return;
      }

      const data = await response.json();

      await AsyncStorage.setItem("access_token", data.access);
      await AsyncStorage.setItem("refresh_token", data.refresh);
      login();
    } catch (error) {
      console.error("fetch failed", error);
    }

    setErrors([]);
    setIsLoading(false);
    router.replace({ pathname: "/" });
  };

  return (
    <ImageBackground
      className="justify-center items-center "
      style={{ width: width, height: height }}
      source={IMAGES.authBg}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 bg-white w-[100%] h-[70%] rounded-t-[3rem] p-6 gap-12 translate-y-72">
          <Text className=" mx-auto my-4 text-blue-900 text-2xl font-semibold">
            Welcome Back
          </Text>
          {/* form fields */}
          <View className="flex gap-8">
            {/* Email */}
            <View className="relative">
              <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
                <Text className="text-xs">Email</Text>
              </View>
              <TextInput
                value={userDetails.email}
                onChangeText={(text) =>
                  setUserDetails((prev) => ({ ...prev, email: text }))
                }
                placeholder="Enter email address"
                placeholderTextColor="#4b5563"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 text-black"
              />
            </View>
            {/* Password */}
            <View className="relative">
              <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
                <Text className="text-xs">Password</Text>
              </View>
              <View className="flex flex-row relative">
                <TextInput
                  onChangeText={(text) =>
                    setUserDetails((prev) => ({ ...prev, password: text }))
                  }
                  placeholder="Enter password"
                  placeholderTextColor="#4b5563"
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 pr-14 flex-1 text-black"
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
            <View className="flex flex-row justify-between">
              <View className=" flex justify-start flex-row items-center -my-5">
                <Switch
                  value={isChecked}
                  onValueChange={() => setIsChecked(!isChecked)}
                  trackColor={{ false: "#ccc", true: "#1e3a8a" }}
                  thumbColor={isChecked ? "#1e3a8a" : "#f9fafb"}
                />
                <Text className="text-sm text-blue-900">Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm text-blue-900 ">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="bg-blue-900 p-4  rounded-3xl"
            onPress={handleOnSubmit}
          >
            <Text className="text-white m-auto">
              {isLoading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <View className="mx-auto flex flex-row gap-2 -my-5">
            <Text> Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => router.replace({ pathname: "/auth/signUp" })}
            >
              <Text className="text-blue-900 ">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View className="flex gap-2">
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Text className="text-red-600" key={index}>
                  {error}
                </Text>
              ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
