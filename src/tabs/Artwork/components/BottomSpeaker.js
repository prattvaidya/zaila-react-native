import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import * as Speech from 'expo-speech'
import { FontAwesome } from '@expo/vector-icons'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const BottomSpeaker = ({ title, artist, content }) => {
	const [isPlaying, setIsPlaying] = useState(false)

	const toggleSpeakControl = () => {
		setIsPlaying(!isPlaying)

		if (!isPlaying) {
			Speech.isSpeakingAsync().then(status => {
				!status ? speak(content[0].description, 'en-US') : Speech.resume()
			})
		} else {
			Speech.pause()
		}
	}

	const speak = (content, languageCode) => {
		const thingToSay = content
		Speech.speak(thingToSay, {
			language: languageCode,
			rate: 0.9,
			onDone: () => {
				setIsPlaying(false)
			}
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.leftPart}>
				<ZailaText style={styles.textInfo}>{title}</ZailaText>
				<ZailaText style={styles.textInfo}>{artist}</ZailaText>
			</View>
			<View style={styles.rightPart}>
				{!isPlaying ? (
					<>
						<TouchableWithoutFeedback onPress={toggleSpeakControl} style={styles.speakControlBtn}>
							<FontAwesome name="play-circle-o" size={48} color="lightgray" />
						</TouchableWithoutFeedback>
						<Image style={styles.character} source={require('zaila/assets/img/zaila-normal.png')} />
					</>
				) : (
					<>
						<TouchableWithoutFeedback onPress={toggleSpeakControl} style={styles.speakControlBtn}>
							<FontAwesome name="pause-circle-o" size={48} color="lightgray" />
						</TouchableWithoutFeedback>
						<Image style={styles.character} source={require('zaila/assets/img/zaila-music.png')} />
					</>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#FAFAFA',
		flexDirection: 'row'
	},
	leftPart: {
		width: '60%',
		paddingLeft: 8,
		flex: 1,
		justifyContent: 'center'
	},
	textInfo: {
		textAlign: 'center'
	},
	rightPart: {
		width: '40%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	speakControlBtn: {},
	character: {
		width: 60,
		height: 60,
		marginHorizontal: 16
	}
})

export default BottomSpeaker
