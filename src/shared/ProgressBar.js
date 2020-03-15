import React from "react";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
// Core components
import ZailaText from "zaila/src/core/ZailaText";

const ProgressBar = ({ progressValue = 1 }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        justifyContent: "space-between"
      }}
    >
      <View style={{ width: "90%" }}>
        <Progress.Bar color="#F79839" progress={progressValue} width={null} />
      </View>
      <ZailaText>{progressValue * 100 + "%"}</ZailaText>
    </View>
  );
};

export default ProgressBar;
