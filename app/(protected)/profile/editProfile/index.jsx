import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DisplayPicture from "../../../../components/editProfile/displayPicture";

const { width, height } = Dimensions.get("screen");
const EditProfile = () => {
  const initialUsername = "Don Dad";
  const [username, setUserName] = useState(null);

  useEffect(() => {
    setUserName(initialUsername);
  }, [initialUsername]);

  const disabled = username === initialUsername;
  return (
    <View
      className=" gap-8 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
        Edit Profile
      </Text>

      {/* <View className="relative justify-center items-center mx-auto">
        <Image source={IMAGES.authBg} className="w-40 h-40 rounded-full" />
        <TouchableOpacity className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md elevation-md shadow-black">
          <AntDesign name="camera" size={16} color="black" />
        </TouchableOpacity>
      </View> */}
      <View className="relative justify-center items-center mx-auto">
        <DisplayPicture />
      </View>

      <View className="px-[4%] gap-8">
        <View>
          <View className="flex flex-row items-center">
            <Text className=" font-semibold text-xl">Username </Text>
            <Text className="text-gray-500">(editable)</Text>
          </View>
          <TextInput
            className="border px-2 rounded-lg border-gray-400 text-gray-500"
            value={username}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View>
          <Text className=" font-semibold text-xl">Fullname</Text>
          <TextInput
            className="border px-2 rounded-lg border-gray-400 text-gray-500"
            readOnly
            value="Mawuko Senyo Hayibor"
          />
        </View>
        <View>
          <Text className=" font-semibold text-xl">Email address</Text>
          <TextInput
            className="border px-2 rounded-lg border-gray-400 text-gray-500"
            readOnly
            value="user@gmail.com"
          />
        </View>
      </View>
      <View className="px-[4%]">
        <TouchableOpacity
          disabled={disabled}
          className="bg-blue-950 flex text-center py-3 my-[8%] "
        >
          <Text className="text-white text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
