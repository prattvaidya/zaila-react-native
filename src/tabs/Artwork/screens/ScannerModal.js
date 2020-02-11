import React,{useState} from 'react';
import {View, Text,Alert,TouchableHighlight,Modal} from 'react-native';

const ScannerModal = ({isOpen,toggleModal}) => {

   
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
                <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight
                        onPress={toggleModal}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

export default ScannerModal;