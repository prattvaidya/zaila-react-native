import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("zaila/assets/img/loading.gif")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Loading;
