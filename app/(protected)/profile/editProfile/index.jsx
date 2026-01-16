import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const EditProfile = () => {
  return (
    <View
      className=" gap-8 py-12 flex flex-col"
      style={{ width: width, height: height }}
    >
      <Text className="text-gray-500 text-center font-bold border-b border-b-gray-500 py-2">
        Edit Profile
      </Text>

      <View className="relative justify-center items-center mx-auto">
        <Image source={IMAGES.authBg} className="w-40 h-40 rounded-full" />
        <TouchableOpacity className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md elevation-md shadow-black">
          <AntDesign name="camera" size={16} color="black" />
        </TouchableOpacity>
      </View>
      {/* <View>
        <Text>Hello</Text>
      </View> */}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
