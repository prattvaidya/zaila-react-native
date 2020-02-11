import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableHighlight,
    Modal,
    StyleSheet
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

import {globalStyles} from '../../../../styles/global';

const ScannerModal = ({isOpen, toggleModal}) => {

    const [hasPermission,
        setHasPermission] = useState(null);
    const [scanned,
        setScanned] = useState(false);

    useEffect(() => {
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text style={globalStyles.textCenter}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={globalStyles.textCenter}>No access to camera</Text>;
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isOpen}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}>
            <View style={{
                marginTop: 22
            }}> 
                <Text style={globalStyles.textCenter}>Scan QR Code here</Text>
                <View style={styles.modalContainer}>
                <BarCodeScanner
                    onBarCodeScanned={scanned
                    ? undefined
                    : handleBarCodeScanned}
                    style={styles.cameraContainer}/>
                <TouchableHighlight style={styles.closeButton} onPress={toggleModal}>
                    <Text style={globalStyles.textWhite}>X</Text>
                </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        position: "relative"
    },
    cameraContainer: {
        width: '100%',
        height: '95%'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10
    }

});

export default ScannerModal;