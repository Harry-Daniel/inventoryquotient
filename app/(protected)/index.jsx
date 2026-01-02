import {
  Dimensions,
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
        className="flex flex-col my-16 "
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        

      >
        <View className="h-[30vh] w-[100vw] bg-black ">
          <Text>tt</Text>
        </View>
        <Text className="text-gray-500">Welcome to the Home Page!</Text>
        <View className="h-[100vh] w-[20vw] bg-blue-400"></View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
