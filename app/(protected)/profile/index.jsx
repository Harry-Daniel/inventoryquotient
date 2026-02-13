import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../constants";
import ProfileBrief from "../../../components/profileBrief";

import ProfileMenu from "../../../components/profileMenu";

const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { params } = useLocalSearchParams();

  return (
    <View
      className=" gap-6 py-12 flex flex-col bg-white"
      style={{ width: width, height: height }}
    >
      <View className="shadow-black shadow-sm bg-white elevation-md h-[98%] rounded-b-[4rem] gap-2">
        <ProfileBrief />
        <ProfileMenu />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
