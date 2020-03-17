import React from "react";
import { View } from "react-native";

// Core components
import ZailaText from "zaila/src/core/ZailaText";
import ZailaButton from "zaila/src/core/ZailaButton";

const Settings = () => {
  return (
    <View>
      <ZailaButton style={{ backgroundColor: "white" }}>Report Bug</ZailaButton>
      <ZailaButton style={{ backgroundColor: "white" }}>
        Contact Zaila
      </ZailaButton>
      <ZailaButton style={{ backgroundColor: "white" }}>Logout</ZailaButton>
    </View>
  );
};

export default Settings;
