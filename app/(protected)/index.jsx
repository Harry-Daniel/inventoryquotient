import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Categories from "../../components/categories";
import { IMAGES } from "../../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("screen");

// Note: In app.js , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View style={{ width: width, height: height }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-col my-16 gap-4 bg-gray-100 h-[100vh]">
          <View className="h-[30vh] w-[100vw] bg-black "></View>

          <Categories />

          <View className="px-5 w-full mt-4">
            <View className=" h-32 w-full rounded-xl bg-blue-950 overflow-hidden flex flex-row gap-0.5  shadow-md shadow-black">
              <Image
                source={IMAGES.authBg}
                className="h-full w-[40%] rounded-l-xl"
              />

              <View className="flex-col p-2  w-[60%] overflow-hidden gap-2">
                <View>
                  <Text className="text-blue-100 text-lg font-bold ">
                    Tomatoes
                  </Text>
                  <View className="bg-blue-100 flex flex-row justify-center items-center rounded-md gap-2 px-2 self-start">
                    <MaterialIcons name="inventory" size={10} color="#1e40af" />
                    <Text className="text-blue-800 text-xs font-bold">10</Text>
                  </View>
                </View>
                <Text className="text-blue-200 flex-wrap w-full text-sm">
                  Inside the little cupboard to the left
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
