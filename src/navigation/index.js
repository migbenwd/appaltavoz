import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import WelcomeScreen from "../screens/WelcomeScreen";
import SplashScreens from "../screens/SplashScreens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              iconName = "compass-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }

            const customizeSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "blue" : "gray"}
              />
            );
          },

          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashS"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashS" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
