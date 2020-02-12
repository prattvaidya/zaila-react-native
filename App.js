// React and React Native
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigator from "zaila/src/tabs/TabNavigator";

// Tab content
import HomeTab from "zaila/src/tabs/Home/HomeTab";
import ArtworkTab from "zaila/src/tabs/Artwork/ArtworkTab";
import ProfileTab from "zaila/src/tabs/Profile/ProfileTab";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <TabNavigator {...props} />}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Artwork" component={ArtworkTab} />
        <Tab.Screen name="Profile" component={ProfileTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
