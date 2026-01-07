import { View } from "react-native";
import InventoryCard from "./inventoryCard";

const InventoryList = () => {
  const inventoryList = [1, 2, 3, 4, 5, 6];
  return (
    <View className="w-auto h-[52vh]">
      <InventoryCard items={inventoryList} />
    </View>
  );
};

export default InventoryList;
