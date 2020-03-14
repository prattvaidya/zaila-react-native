// React and React Native
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

// Global Styles
import { colors } from 'zaila/styles/global'

// Images
import BtnLeftTag from 'zaila/assets/img/btn-left-tag.png'
import BtnRightTag from 'zaila/assets/img/btn-right-tag.png'

// How to use:
// 1. Import the component
// 2. Pass any styles through the 'style' prop
// 3. Write the button text to display inside the opening and closing tags

const ZailaButton = ({ children, style, onPress: handleOnPress }) => {
	return (
		<TouchableOpacity style={[styles.btn, style]} onPress={handleOnPress}>
			<Image source={BtnLeftTag} />
			<ZailaText style={styles.btnText}>{children}</ZailaText>
			<Image source={BtnRightTag} />
		</TouchableOpacity>
	)
}

export default ZailaButton

const styles = StyleSheet.create({
	btn: {
		// Size and Spacing
		minWidth: '50%',
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10,
		marginBottom: 10,

		// Borders
		borderRadius: 50,
		borderWidth: 1,
		borderColor: colors.seaBuckthorn,

		//Content
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	btnText: { textAlign: 'center', color: colors.claret }
})
