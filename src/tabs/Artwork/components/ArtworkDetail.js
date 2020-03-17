import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Speech from "expo-speech";
import BottomSpeaker from "./BottomSpeaker";
import RNPickerSelect from "react-native-picker-select";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const ArtworkDetail = ({ descriptionInfo, preferLang }) => {
  const [content, setContent] = useState(descriptionInfo[0].description);

  useEffect(() => {
    const info = descriptionInfo.find(item => {
      return item.languageCode === preferLang;
    });

    console.log(info);

    info ? setContent(info.description) : setContent("");
  }, [descriptionInfo]);

  //Stop speech when component Unmounted
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  });

  return (
    <View style={styles.container}>
      {/* <RNPickerSelect
                placeholder={{label:"Select Language",value:"en-US"}}
                onValueChange={(value) => setLanguageType(value)}
                items={languageList}/>  */}
      <View style={styles.scrollContainer}>
        <ScrollView>
          <ZailaText style={{ color: "#276180" }}>{content}</ZailaText>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 280
  },
  scrollContainer: {
    padding: 8
  }
});

export default ArtworkDetail;
