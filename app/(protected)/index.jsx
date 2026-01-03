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
  const inventoryList = [1, 2, 3, 4];
  return (
    <View style={{ width: width, height: height }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-col my-16 gap-4 bg-gray-100 h-[100vh]">
          <HeroImage />

          <Categories />
          <InventoryCard items={inventoryList} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
