import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import * as Font from 'expo-font'

const ZailaText = ({ children, style }) => {
	const [fontLoaded, setFontLoaded] = useState(false)

	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				'open-sans-regular': require('zaila/assets/fonts/OpenSans-Regular.ttf')
			})
			setFontLoaded(true)
		}
		loadFonts()
	}, [])

	return fontLoaded ? <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'open-sans-regular',
		fontSize: 18
	}
})

export default ZailaText
