import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
import VideoScreen from "../screens/VideoScreen";
import AlertScreen from "../screens/AlertScreen";

const Stack = createStackNavigator();
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "blue" : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "blue",
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Status" component={ConfirmScreen} />
    </Stack.Navigator>
  );
}

function VideoStackNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Videos" component={VideoScreen} />
    </Stack.Navigator>
  );
}

function AlertStackNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Messages" component={AlertScreen} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, VideoStackNavigator, AlertStackNavigator };
