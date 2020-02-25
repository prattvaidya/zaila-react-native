import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { globalStyles } from "zaila/styles/global";
import MuseumList from "zaila/src/tabs/Home/components/MuseumList";

const Home = () => (
  <View style={globalStyles.container}>
    <MuseumList />
  </View>
);

const styles = StyleSheet.create({
  btn: {
    alignSelf: "stretch"
  },
  locationInfo: {
    alignItems: "center"
  }
});

export default Home;
