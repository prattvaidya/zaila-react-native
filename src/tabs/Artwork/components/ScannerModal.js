import React, { useState, useEffect } from 'react'
import { View, Alert, TouchableHighlight, Modal, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { globalStyles } from '../../../../styles/global'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const ScannerModal = ({ isOpen, toggleModal, toggleArtworkModal, setSensorId }) => {
	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
		setScanned(false)
		;(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		const sensorId = data
		setScanned(false)
		toggleModal()

		setSensorId(sensorId)
		toggleArtworkModal()
	}

	if (hasPermission === null) {
		return <ZailaText style={globalStyles.textCenter}>Requesting for camera permission</ZailaText>
	}
	if (hasPermission === false) {
		return <ZailaText style={globalStyles.textCenter}>No access to camera</ZailaText>
	}

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={isOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
			}}
		>
			<View
				style={{
					marginTop: 22
				}}
			>
				<ZailaText style={globalStyles.textCenter}>Scan QR Code here</ZailaText>
				<View style={styles.modalContainer}>
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={styles.cameraContainer}
					/>
					<TouchableHighlight style={styles.closeButton} onPress={toggleModal}>
						<ZailaText style={[globalStyles.textWhite, styles.closeButtonText]}>X</ZailaText>
					</TouchableHighlight>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		position: 'relative'
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
	closeButtonText: {
		fontSize: 24,
		fontWeight: 'bold'
	}
})

export default ScannerModal
