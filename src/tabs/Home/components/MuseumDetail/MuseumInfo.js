// React and React Native
import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

import { colors } from 'zaila/styles/global'

const MuseumInfo = ({ museum }) => {
	// Set image dimensions
	const dimensions = Dimensions.get('window')
	const imageHeight = Math.round((dimensions.width * 9) / 16) * 0.55
	const imageWidth = dimensions.width * 0.55

	// Temporary static data for the Museum's timings
	const timings = [
		{
			day: 'Sun',
			open: '10:00 am',
			close: '5:00 pm',
			current: true
		},
		{
			day: 'Mon',
			open: '10:00 am',
			close: '5:00 pm'
		},
		{
			day: 'Tue',
			open: '10:00 am',
			close: '5:00 pm'
		},
		{
			day: 'Wed',
			open: '10:00 am',
			close: '5:00 pm'
		},
		{
			day: 'Thu',
			open: '10:00 am',
			close: '5:00 pm'
		},
		{
			day: 'Fri',
			open: '10:00 am',
			close: '5:00 pm'
		},
		{
			day: 'Sat',
			open: '10:00 am',
			close: '5:00 pm'
		}
	]

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.header}>
					<ZailaText style={styles.title}>{museum.name}</ZailaText>
					<ZailaText style={styles.addr}>
						{museum.address} - {museum.city}, {museum.province}
					</ZailaText>
				</View>
				<View style={styles.headerInfo}>
					<Image style={{ height: imageHeight, width: imageWidth }} source={{ uri: museum.imageURL }} />
					<View style={styles.timingContainer}>
						{timings.map((time, index) => (
							<ZailaText key={index} style={[styles.timings, time.current && styles.currentTiming]}>
								{time.day}. - {time.open} - {time.close}
							</ZailaText>
						))}
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E5E5E5'
	},
	header: {
		paddingBottom: 10,
		backgroundColor: colors.claret
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: 'white'
	},
	addr: {
		textAlign: 'center',
		fontSize: 12,
		color: 'white'
	},
	headerInfo: {
		flexDirection: 'row',
		padding: 5
	},
	timingContainer: {
		justifyContent: 'center',
		paddingLeft: 10
	},
	timings: {
		fontSize: 10,
		color: colors.bdazzledBlue
	},
	currentTiming: {
		fontWeight: 'bold'
	}
})

export default MuseumInfo
