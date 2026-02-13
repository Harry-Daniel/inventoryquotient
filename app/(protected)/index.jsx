import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import Categories from "../../components/categories";
import HeroImage from "../../components/heroImage";
import InventoryList from "../../components/InventoryList";
const { width, height } = Dimensions.get("screen");

// Note: In app.js , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View style={{ width: width, height: height }} className="bg-white">
      <View className="flex flex-col my-16 gap-4 bg-gray-100 h-[100vh]">
        <HeroImage />
        <View className="flex items-center justify-center">
          <TextInput
            placeholder="search"
            autoCapitalize="none"
            autoCorrect={true}
            className="border rounded-lg border-gray-500 focus:border-blue-950  w-[80%] py-0.5 pl-4 text-black"
          />
        </View>

        {/* <Categories /> */}

        <InventoryList />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
