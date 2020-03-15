import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

const ScannerModal = ({
  isOpen,
  toggleModal,
  toggleArtworkModal,
  setSensorId
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    setScanned(false);
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const sensorId = data;
    setScanned(false);
    toggleModal();

    setSensorId(sensorId);
    toggleArtworkModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.rootContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.bubbleContainer}>
              <ZailaText style={styles.bubbleTitle}>Scan QR Code</ZailaText>

              <ImageBackground
                source={require("zaila/assets/img/qr-border.png")}
                style={styles.cameraBoarder}
              >
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={styles.cameraContainer}
                />
              </ImageBackground>

              <ZailaText style={styles.bubbleDescription}>
                Align QR code to fill inside the frame.
              </ZailaText>
            </View>
            <Image
              style={styles.snapshot}
              source={require("zaila/assets/img/zaila-popup.png")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    fontSize: 20
  },
  bubbleDescription: {
    textAlign: "center",
    color: "#88163B",
    marginVertical: 8
  },
  cameraBoarder: {
    width: 230,
    height: 230,
    position: "relative",
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraContainer: {
    width: 200,
    height: 200,
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default ScannerModal;
