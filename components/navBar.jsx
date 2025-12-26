import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { usePathname, useRouter } from "expo-router";
const { width, height } = Dimensions.get("screen");
const NavBar = () => {
  // custom colours
  const navbarWhite = "#ccc9c9";
  const navbarWhiteNativewind = "text-[#ccc9c9]";
  const navbarGray = "#374151";

  const pathname = usePathname();
  const router = useRouter();

  const params = "This is just to show how to pass parameters: Hello World"; //Example parameter to be passed

  // handling onPress Routing
  const handlePress = (path) => {
    router.push({ pathname: path, params: { params: params } });
  };

  // Naming the pathnames
  const homePathname = "/";
  const profilePathname = "/profile";

  // Path Checks
  const whiteBgCheckPath = (pagePathname) =>
    pathname === pagePathname
      ? "absolute bg-white scale-[2] h-[90%] -top-2  w-[110%] m-auto p-auto -z-10 rounded-full"
      : "hidden";

  const iconCheckPath = (pagePathname) =>
    pathname === pagePathname ? `${navbarGray}` : `${navbarWhite}`;

  const textCheckPath = (pagePathname) =>
    `${pathname === pagePathname ? "text-gray-700" : `${navbarWhiteNativewind}`} text-xs`;

  return (
    <View className="items-center">
      <View
        className={`absolute bottom-16 flex-row justify-around items-center ${navbarWhiteNativewind} bg-gray-700 border border-white py-4 px-5 rounded-full gap-4 shadow-2xl`}
        style={{ maxWidth: width, minWidth: width * 0.4 }}
      >
        <View className="relative">
          <View className={whiteBgCheckPath(homePathname)}></View>
          <TouchableOpacity
            onPress={() => handlePress("/")}
            className="justify-center items-center gap-1 "
          >
            <AntDesign
              name="home"
              size={20}
              color={iconCheckPath(homePathname)}
            />
            <Text className={textCheckPath(homePathname)}> Home</Text>
          </TouchableOpacity>
        </View>
        <View className={`relative`}>
          <View className={whiteBgCheckPath(profilePathname)}></View>
          <TouchableOpacity
            onPress={() => handlePress("/profile")}
            className="justify-center items-center gap-1"
          >
            <AntDesign
              name="user"
              size={20}
              color={iconCheckPath(profilePathname)}
            />
            <Text className={textCheckPath(profilePathname)}> Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavBar;
