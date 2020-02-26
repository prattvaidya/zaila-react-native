import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "zaila/styles/global";
import MuseumList from "zaila/src/tabs/Home/components/MuseumList";
import GPS from "zaila/src/tabs/Home/components/GPS";

const Home = ({ navigation }) => {
  // Stores the user's address (street, city, etc.)
  const [address, setAddress] = useState({});

  return (
    <View style={globalStyles.container}>
      <GPS address={address} setAddress={setAddress} />
      <MuseumList city={address.city} navigation={navigation} />
    </View>
  );
};

export default Home;
