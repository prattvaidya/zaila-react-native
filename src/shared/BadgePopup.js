import React from "react";
import {
  View,
  Modal,
  Image,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const BadgePopup = ({ isOpen, toggleModal }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.rootContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.bubbleContainer}>
            <ZailaText style={styles.bubbleTitle}>CONGRATULATIONS!</ZailaText>
            <Image source={require("zaila/assets/img/badge.png")} />
            <ZailaText style={styles.bubbleDescription}>
              You have successfully completed an exhibition. Here’s a badge for
              your achievement! Collect more badges by exploring and winning
              more quests!!
            </ZailaText>
            <ZailaText style={styles.bubbleDescription}></ZailaText>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={toggleModal}
            >
              <FontAwesome name="close" size={16} color="#F79839" />
            </TouchableHighlight>
          </View>
          <Image source={require("zaila/assets/img/zaila-popup.png")} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  modalContainer: {
    position: "relative",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  bubbleContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    width: "80%",
    height: "60%",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#F79839",
    borderWidth: 2,
    position: "relative"
  },

  bubbleTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 16,
    color: "#88163B",
    fontSize: 22,
    fontWeight: "bold"
  },
  bubbleDescription: {
    textAlign: "center",
    color: "#276180",
    marginTop: 32,
    marginHorizontal: 16
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "#F79839",
    borderWidth: 2,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default BadgePopup;
