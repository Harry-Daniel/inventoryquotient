import { z } from "zod";
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
  View,
} from "react-native";
import { IMAGES } from "../../../constants";

const { width, height } = Dimensions.get("screen");
const SignUp = () => {
  const signUpSchema = z.object({
    username: z
      .string()
      .min(1, "Username field is required")
      .max(255, "You have exceeded the character limit for fullname"),
    first_name: z
      .string()
      .min(1, "First name field is required")
      .max(255, "You have exceeded the character limit for fullname"),
    last_name: z
      .string()
      .min(1, "Last name field is required")
      .max(255, "You have exceeded the character limit for fullname"),
    email: z.email("A valid email is required"),
    password: z.string().min(1, "Password Field is required"),
  });

  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  // simulating on submit

  const handleOnSubmit = async () => {
    setErrors([]);
    const result = signUpSchema.safeParse(userDetails);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      setErrors(errorMessages);
      return;
    }
    if (!isChecked) {
      setErrors(["You must agree to processing of data"]);
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:8000/auth/users/", {
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
        return;
      }
    } catch (error) {
      console.error("fetch failed", error);
    }

    router.replace({ pathname: "/signIn" });
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
          {/* Username */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">Username</Text>
            </View>
            <TextInput
              onChangeText={(text) =>
                setUserDetails((prev) => ({ ...prev, username: text }))
              }
              placeholder="Enter username"
              placeholderTextColor="#4b5563"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              returnKeyType="next"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 text-black"
            />
          </View>
          {/* First Name */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">First Name</Text>
            </View>
            <TextInput
              onChangeText={(text) =>
                setUserDetails((prev) => ({ ...prev, first_name: text }))
              }
              placeholder="Enter first name(s)"
              placeholderTextColor="#4b5563"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              returnKeyType="next"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 text-black"
            />
          </View>
          {/* Lastname */}
          <View className="relative">
            <View className=" bg-white w-auto h-auto px-1.5 translate-x-4  z-10 -translate-y-2.5 absolute">
              <Text className="text-xs">Last Name</Text>
            </View>
            <TextInput
              onChangeText={(text) =>
                setUserDetails((prev) => ({ ...prev, last_name: text }))
              }
              placeholder="Enter last name"
              placeholderTextColor="#4b5563"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              returnKeyType="next"
              className="border rounded-lg border-gray-400 focus:border-gray-600  p-2 text-black"
            />
          </View>
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
          <View className=" flex justify-start flex-row items-center -my-5">
            <Switch
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
              trackColor={{ false: "#ccc", true: "#1e3a8a" }}
              thumbColor={isChecked ? "#1e3a8a" : "#f9fafb"}
            />
            <Text className="text-sm text-blue-900">
              I agree to the processing of the Provided data
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-900  p-4  rounded-3xl"
          onPress={handleOnSubmit}
        >
          <Text className="text-white m-auto">Sign Up</Text>
        </TouchableOpacity>
        <View className="mx-auto flex flex-row gap-2 -my-5">
          <Text> Already have an account?</Text>
          <TouchableOpacity
            onPress={() => router.replace({ pathname: "/signIn" })}
          >
            <Text className="text-blue-900 ">Sign In</Text>
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
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
