import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import ScannerModal from '../components/ScannerModal'
import ArtworkInfoModal from '../components/ArtworkInfoModal'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const ArtworkHome = () => {
	const [openModal, setOpenModal] = useState(false)
	const [openArtworkModal, setOpenArtworkModal] = useState(false)
	const [sensorId, setSensorId] = useState(null)

	useEffect(() => {
		//   setOpenModal(true);
		console.log('open!')
	})

	const toggleModal = () => {
		setOpenModal(!openModal)
	}

	const toggleArtworkModal = () => {
		setOpenArtworkModal(!openArtworkModal)
	}

	return (
		<View style={styles.container}>
			<ScannerModal
				setSensorId={setSensorId}
				toggleModal={toggleModal}
				toggleArtworkModal={toggleArtworkModal}
				isOpen={openModal}
			/>
			<ArtworkInfoModal
				sensorId={sensorId}
				toggleArtworkModal={toggleArtworkModal}
				isOpenArtworkModal={openArtworkModal}
			/>
			<TouchableOpacity onPress={toggleModal}>
				<ZailaText style={styles.button}>Scan QR code</ZailaText>
			</TouchableOpacity>
			<TouchableOpacity onPress={toggleArtworkModal}>
				<ZailaText>Artwork</ZailaText>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	button: {
		backgroundColor: 'hotpink',
		color: 'white',
		fontSize: 20,
		padding: 10
	}
})

export default ArtworkHome
