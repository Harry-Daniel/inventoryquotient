import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");

// Note: In app.js , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View style={{ width: width, height: height }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-col my-16 gap-4">
          <View className="h-[30vh] w-[100vw] bg-black "></View>
          <View className="flex flex-row gap-2 justify-center items-center">
            <Pressable>
              <Text className="text-black text-sm border-b-[0.5px]">All</Text>
            </Pressable>
            <Pressable>
              <Text className="text-gray-500 text-sm">Perishables</Text>
            </Pressable>
            <Pressable>
              <Text className="text-gray-500 text-sm">Non Perishables</Text>
            </Pressable>
            <Pressable>
              <Text className="text-gray-500 text-sm">Tools</Text>
            </Pressable>
          </View>
          <View className="h-[100vh] w-[20vw] bg-blue-400"></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
