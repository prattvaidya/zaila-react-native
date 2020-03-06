import React from "react";
import { View, StyleSheet } from "react-native";

import GPS from "zaila/src/tabs/Home/components/Home/GPS";
import SearchMuseums from "zaila/src/tabs/Home/components/Home/SearchMuseums";

const Header = ({ address, setAddress }) => (
  <View style={styles.container}>
    <GPS address={address} setAddress={setAddress} />
    <SearchMuseums />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#707070",
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default Header;
