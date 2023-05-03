import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AlertStackNavigator,
  HomeStackNavigator,
  VideoStackNavigator,
} from "./StackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const defaultNavOptions = {
    headerShown: false,
    tabBarActiveTintColor: colors.black,
    tabBarInactiveTintColor: colors.gray,
    tabBarActiveBackgroundColor: colors.primary,
  };

  return (
    <Tab.Navigator screenOptions={defaultNavOptions}>
      <Tab.Screen
        name="Requst Help"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email-send" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tutorials"
        component={VideoStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-account"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="comment-alert"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
