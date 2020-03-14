import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import * as Font from 'expo-font'

// How to use:
// 1. Import the component
// 2. Pass any styles through the 'style' prop
// 3. Write the text to display inside the opening and closing tags

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

	return fontLoaded ? <Text style={[styles.text, style]}>{children}</Text> : <></>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'open-sans-regular',
		fontSize: 16
	}
})

export default ZailaText
