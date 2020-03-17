import React from "react";
import { View, StyleSheet } from "react-native";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const ProfileHeader = ({ name = "Unknown" }) => {
  return (
    <View style={styles.headerContainer}>
      <ZailaText
        bold
        style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
      >
        Hello
      </ZailaText>
      <ZailaText
        bold
        style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
      >
        {name}
      </ZailaText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#88163B",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  }
});

export default ProfileHeader;
