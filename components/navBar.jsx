import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { usePathname, useRouter } from "expo-router";
import { useAuthetication } from "../store/store";
const { width, height } = Dimensions.get("screen");
const NavBar = () => {
  // Global Staes from Zustand

  // custom colours
  const navbarSecondaryColor = "#ccc9c9";
  const navbarSecondaryTextColorNativewind = "text-[#ccc9c9]";
  const navbarPrimaryColor = "#172554";
  const navbarPrimaryTextColorNativewind = "text-[#172554]";

  const pathname = usePathname();
  const router = useRouter();

  const params = "This is just to show how to pass parameters: Hello World"; //Example parameter to be passed

  // handling onPress Routing
  const handlePress = (path) => {
    router.replace({ pathname: path, params: { params: params } });
  };

  // Naming the pathnames
  const homePathname = "/";
  const profilePathname = "/profile";

  // Path Checks
  const whiteBgCheckPath = (pagePathname) =>
    pathname === pagePathname
      ? "absolute bg-[#f3f4f6] h-[90%] w-[110%] rounded-full -z-10"
      : "hidden";

  const iconCheckPath = (pagePathname) =>
    pathname === pagePathname
      ? `${navbarPrimaryColor}`
      : `${navbarSecondaryColor}`;

  const textCheckPath = (pagePathname) =>
    `${pathname === pagePathname ? `${navbarPrimaryTextColorNativewind}` : `${navbarSecondaryTextColorNativewind}`} text-xs`;

  // returning null to remove navBar if user is not auhenticated

  return (
    <View className="items-center">
      <View
        className={`absolute bottom-2 flex-row justify-around items-center ${navbarSecondaryTextColorNativewind} bg-blue-950  border border-gray-100 py-2 px-5 rounded-full gap-4 shadow-2xl z-10`}
        style={{ maxWidth: width, minWidth: width * 0.4 }}
      >
        <View className="relative">
          <View
            className={whiteBgCheckPath(homePathname)}
            style={{ transform: [{ scale: 2 }], top: -8 }}
          ></View>
          <TouchableOpacity
            onPress={() => handlePress(homePathname)}
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
          <View
            className={whiteBgCheckPath(profilePathname)}
            style={{ transform: [{ scale: 2 }], top: -8 ,left:-1.5, backgroundColor:"#ffffff"}}
          ></View>
          <TouchableOpacity
            onPress={() => handlePress(profilePathname)}
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
