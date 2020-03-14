import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
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
              <Text style={styles.bubbleTitle}>Scan QR Code</Text>
              <View style={styles.cameraBoarder}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={styles.cameraContainer}
                />
              </View>
              <Text style={styles.bubbleDescription}>
                Align QR code to fill inside the frame.
              </Text>
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
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  modalContainer: {
    position: "relative",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
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
    borderColor: "#F79839",
    borderWidth: 8,
    padding: 8
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
