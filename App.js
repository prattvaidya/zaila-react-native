import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Home from "./screens/Home";

import ArtworkTab from './src/tabs/Artwork/ArtworkTab';
import ArtworkInfo from "./src/tabs/Artwork/components/ArtworkInfo";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <ArtworkInfo/> */}
      <ArtworkTab/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
