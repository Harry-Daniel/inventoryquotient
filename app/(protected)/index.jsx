import { Dimensions, StyleSheet, View } from "react-native";
import Categories from "../../components/categories";
import HeroImage from "../../components/heroImage";
import InventoryList from "../../components/InventoryList";
const { width, height } = Dimensions.get("screen");

// Note: In app.js , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View style={{ width: width, height: height }}>
      <View className="flex flex-col my-16 gap-4 bg-gray-100 h-[100vh]">
        <HeroImage />

        <Categories />

        <InventoryList/>
        
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
