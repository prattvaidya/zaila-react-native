import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "zaila/src/tabs/Home/components/Home";

import ExhibitionDetail from './components/ExhibitionDetail';

const HomeStack = createStackNavigator();

const HomeTab = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ExhibitionDetail" component={ExhibitionDetail} />
    </HomeStack.Navigator>
  );
};

export default HomeTab;
