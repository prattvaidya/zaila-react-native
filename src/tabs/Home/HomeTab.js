import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "zaila/src/tabs/Home/components/Home";

const HomeStack = createStackNavigator();

const HomeTab = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeTab;
