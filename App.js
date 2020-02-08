import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";

import ArtworkInfo from "./src/components/Artwork/ArtworkInfo";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <ArtworkInfo/>
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
