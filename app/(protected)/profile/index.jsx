import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { params } = useLocalSearchParams();

  return (
    <View
      className="p-4 gap-4 py-12 "
      style={{ width: width, height: height }}
    >
  
      <View>
        <Text className="text-gray-500 text-center font-bold border-b py-2">Profile</Text>
      </View>

      <View>
        
      </View>
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
