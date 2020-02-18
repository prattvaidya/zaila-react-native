import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableHighlight,
    Modal,
    StyleSheet
} from 'react-native';
import axios from 'axios';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

import {globalStyles} from '../../../../styles/global';

const ScannerModal = ({isOpen, toggleModal}) => {

    const navigation = useNavigation();

    const [hasPermission,
        setHasPermission] = useState(null);
    const [scanned,
        setScanned] = useState(false);

    useEffect(() => {
        setScanned(false);
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        const sensorId = data;
        setScanned(false);
        toggleModal();
        navigation.push('ArtworkInfo',{
            sensorId:sensorId
        });

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
                    <Text style={[globalStyles.textWhite,styles.closeButtonText]}>X</Text>
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
    },
    closeButtonText:{
        fontSize:24,
        fontWeight:'bold'
    }

});

export default ScannerModal;