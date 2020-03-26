import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { useSpring, animated } from 'react-spring';
import useStateWithCallback from 'use-state-with-callback';
import UserSnippet from '../shared/UserSnippet';

// Core components
import ZailaText from 'zaila/src/core/ZailaText';

// The following code is referenced from https://reactnavigation.org/docs/en/bottom-tab-navigator.html#tabbar
function TabNavigator({ state, descriptors, navigation, toggleModal }) {
  const dimensions = Dimensions.get('window');

  const AnimatedView = animated(View);

  const [props, set, stop] = useSpring(() => ({
    opacity: 1,
    height: '100%',
    width: '100%'
  }));

  const [toggleMenu, setToggleMenu] = useStateWithCallback(
    true,
    (toggleMenu) => {
      set({
        opacity: toggleMenu ? 1 : 0,
        right: toggleMenu ? 0 : dimensions.width * 0.35,
        top: toggleMenu ? 0 : dimensions.width * 0.35,
        height: '100%',
        position: 'relative'
      });
    }
  );

  //Render Tab Menu Item
  const renderTabMenuItem = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    // Custom code: Set a FontAwesome icon based on the name of the route
    let iconName;
    if (route.name === 'Home') {
      iconName = require('zaila/assets/img/home-icon.png');
    } else if (route.name === 'Artwork') {
      iconName = require('zaila/assets/img/scan-icon.png');
    } else if (route.name === 'Profile') {
      iconName = require('zaila/assets/img/profile-icon.png');
    }
    const icon = <Image source={iconName} />;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key
      });
      if (route.name === 'Artwork') {
        toggleModal(true);
      } else {
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.tabItem, styles[route.name]]}
        key={route.key}
      >
        <ZailaText style={{ color: isFocused ? '#673ab7' : '#222' }}>
          {/* Custom Code: Render the icon instead of the name of the route */}
          {icon}
        </ZailaText>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.tabBar}>
      <AnimatedView style={props}>{renderTabMenuItem}</AnimatedView>
      <View style={styles.UserSnippetContainer}>
        <TouchableOpacity onPress={() => setToggleMenu(!toggleMenu)}>
          <UserSnippet />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '40%',
    height: '23%'
  },
  tabItem: {
    margin: 5,
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#88163B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  UserSnippetContainer: {
    position: 'absolute',
    bottom: 10,
    left: 6
  },
  Home: {
    top: 30
  },
  Artwork: {
    top: 40,
    right: 16
  },
  Profile: {
    right: 0,
    bottom: 0
  }
});

export default TabNavigator;
