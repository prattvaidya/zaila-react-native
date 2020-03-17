import React from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as SecureStore from "expo-secure-store";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const ZailaSettings = () => {
  const handleLanguageChange = languageCode => {
    console.log(languageCode);
    SecureStore.setItemAsync("preferLang", languageCode);
  };

  return (
    <ScrollView>
      <View style={styles.optionContainer}>
        <View style={styles.optionNameContainer}>
          <ZailaText bold style={styles.optionName}>
            Language
          </ZailaText>
        </View>
        <View style={styles.optionContentContainer}>
          <TouchableOpacity
            onPress={e => handleLanguageChange("fr-CA")}
            style={styles.languageButton}
          >
            <Image source={require("zaila/assets/img/languages/french.png")} />
            <ZailaText style={{ color: "#276180" }}>Français</ZailaText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => handleLanguageChange("en-US")}
            style={styles.languageButton}
          >
            <Image source={require("zaila/assets/img/languages/english.png")} />
            <ZailaText style={{ color: "#276180" }}>English</ZailaText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => handleLanguageChange("zh-CN")}
            style={styles.languageButton}
          >
            <Image source={require("zaila/assets/img/languages/chinese.png")} />
            <ZailaText style={{ color: "#276180" }}>中文</ZailaText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => handleLanguageChange("es-MX")}
            style={styles.languageButton}
          >
            <Image source={require("zaila/assets/img/languages/spanish.png")} />
            <ZailaText style={{ color: "#276180" }}>Español</ZailaText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionContainer: {},
  optionNameContainer: {
    backgroundColor: "#88163B",
    paddingTop: 6,
    paddingBottom: 11,
    borderColor: "#F79839",
    borderWidth: 2,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    alignSelf: "flex-start"
  },
  optionName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 8
  },
  optionContentContainer: {
    backgroundColor: "white",
    borderColor: "#F79839",
    borderWidth: 2,
    borderRadius: 10,
    height: 70,
    position: "relative",
    marginTop: -5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  languageButton: {
    alignItems: "center"
  }
});

export default ZailaSettings;
