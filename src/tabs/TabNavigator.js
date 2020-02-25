import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// The following code is referenced from https://reactnavigation.org/docs/en/bottom-tab-navigator.html#tabbar
function TabNavigator({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Custom code: Set a FontAwesome icon based on the name of the route
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Artwork") {
          iconName = "paint-brush";
        } else if (route.name === "Profile") {
          iconName = "user";
        }
        const icon = <FontAwesome name={iconName} size={26} color="white" />;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, styles[route.name]]}
            key={route.key}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {/* Custom Code: Render the icon instead of the name of the route */}
              {icon}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// The styles being applied right now aren't foolproof.
// They look fine on one kind of device, but they might not render as expected on a different device.
// I have checked the navigator on iPhone 11 Pro Max and iPhone 8.
// Fortunately, there aren't any design issues on these two devices
// I'll look for a way to improve the styles if we decide to proceed with this UI for the navigator.
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0
  },
  tabItem: {
    margin: 5,
    padding: 20,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "coral",
    justifyContent: "center",
    alignItems: "center"
  },
  // Artwork: {
  //   bottom: 90,
  //   left: -80
  // },
  // Profile: {
  //   bottom: 20,
  //   left: -110
  // }
});

export default TabNavigator;
