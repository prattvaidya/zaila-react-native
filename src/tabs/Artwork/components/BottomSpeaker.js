import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const BottomSpeaker = ({ title, artist, content }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSpeakControl = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      Speech.isSpeakingAsync().then(status => {
        !status ? speak(content[0].description, "en-US") : Speech.resume();
      });
    } else {
      Speech.pause();
    }
  };

  const speak = (content, languageCode) => {
    const thingToSay = content;
    Speech.speak(thingToSay, {
      language: languageCode,
      rate: 0.9,
      onDone: () => {
        setIsPlaying(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <ZailaText style={styles.title}>{title}</ZailaText>
        <ZailaText style={styles.textInfo}>{artist}</ZailaText>
      </View>
      <View style={styles.rightPart}>
        {!isPlaying ? (
          <>
            <TouchableWithoutFeedback
              onPress={toggleSpeakControl}
              style={styles.speakControlBtn}
            >
              <FontAwesome name="play-circle-o" size={30} color="#F79839" />
            </TouchableWithoutFeedback>
            <Image
              style={styles.character}
              source={require("zaila/assets/img/zaila-popup.png")}
            />
          </>
        ) : (
          <>
            <TouchableWithoutFeedback
              onPress={toggleSpeakControl}
              style={styles.speakControlBtn}
            >
              <FontAwesome name="pause-circle-o" size={30} color="#F79839" />
            </TouchableWithoutFeedback>
            <Image
              style={styles.character}
              source={require("zaila/assets/img/zaila-music.png")}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#F79839",
    borderRadius: 40,
    justifyContent: "center",
    marginBottom: 8
  },
  leftPart: {
    paddingLeft: 8,
    flex: 1,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    color: "#276180",
    fontWeight: "bold"
  },
  textInfo: {
    textAlign: "center",
    color: "#276180"
  },
  rightPart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  speakControlBtn: {},
  character: {
    width: 60,
    height: 60,
    marginRight: -5
    // marginBottom: -5
  }
});

export default BottomSpeaker;
