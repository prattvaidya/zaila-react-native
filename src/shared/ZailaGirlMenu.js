import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { useSpring, animated } from 'react-spring';
import useStateWithCallback from 'use-state-with-callback';

const ZailaGirlMenu = () => {
  const AnimatedView = animated(View);

  const dimensions = Dimensions.get('window');

  const [props, set, stop] = useSpring(() => ({ opacity: 1, height: '100%' }));

  const [toggleMenu, setToggleMenu] = useStateWithCallback(
    true,
    (toggleMenu) => {
      set({
        opacity: toggleMenu ? 1 : 0,
        left: toggleMenu ? 0 : dimensions.width * 0.35,
        top: toggleMenu ? 0 : dimensions.width * 0.35,
        height: '100%',
        position: 'relative'
      });
    }
  );

  const handleModal = (name) => {
    console.log(name);
  };

  return (
    <View
      style={[
        styles.menuContainer,
        { width: dimensions.width * 0.35, height: dimensions.height * 0.18 }
      ]}
    >
      <TouchableOpacity
        style={styles.characterContainer}
        onPress={() => setToggleMenu(!toggleMenu)}
      >
        <Image
          style={styles.character}
          source={require('zaila/assets/img/zaila-normal.png')}
        />
      </TouchableOpacity>
      <AnimatedView style={props}>
        <TouchableOpacity
          disabled={!toggleMenu}
          style={[styles.button, styles.button1]}
          onPress={() => handleModal('map')}
        >
          <Image source={require('zaila/assets/img/map-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!toggleMenu}
          style={[styles.button, styles.button2]}
          onPress={() => handleModal('quest')}
        >
          <Image source={require('zaila/assets/img/quest-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!toggleMenu}
          style={[styles.button, styles.button3]}
          onPress={() => handleModal('discovery')}
        >
          <Image source={require('zaila/assets/img/discovery-icon.png')} />
        </TouchableOpacity>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 6,
    right: 10
  },
  characterContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100
  },
  character: {
    width: 60,
    height: 60
  },
  button: {
    backgroundColor: '#F79839',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    width: 55,
    height: 55
  },
  button1: {
    right: 0,
    top: 0
  },
  button2: {
    left: 15,
    top: 6
  },
  button3: {
    left: 0,
    bottom: 0
  }
});

export default ZailaGirlMenu;
