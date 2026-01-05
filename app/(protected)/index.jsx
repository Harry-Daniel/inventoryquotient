import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Categories from "../../components/categories";
import InventoryCard from "../../components/inventoryCard";
import { IMAGES } from "../../constants";
import HeroImage from "../../components/heroImage";
const { width, height } = Dimensions.get("screen");

// Note: In app.js , change the "scheme" to match your project name.
const Home = () => {
  const inventoryList = [1, 2, 3, 4,5,6];
  return (
    <View style={{ width: width, height: height }}>
   
        <View className="flex flex-col my-16 mb-24 gap-4 bg-gray-100 h-[100vh]">
          <HeroImage />

        <Categories />
          <InventoryCard items={inventoryList} />
        </View>
    
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
