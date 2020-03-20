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
import Email from 'zaila/assets/img/email-login.png'
import Google from 'zaila/assets/img/google-login.png'
import Void from 'zaila/assets/img/void.png'

// How to use:
// 1. Import the component
// 2. Pass any styles through the 'style' prop
// 3. Write the button text to display inside the opening and closing tags

const ZailaButton = ({ children, style, onPress: handleOnPress, type = 'regular' }) => {
	return (
		<TouchableOpacity style={[styles.btn, style]} onPress={handleOnPress}>
			{type === 'regular' ? (
				<Image source={BtnLeftTag} />
			) : type === 'email' ? (
				<Image source={Email} style={styles.icons} />
			) : (
				<Image source={Google} style={styles.icons} />
			)}
			<ZailaText style={styles.btnText}>{children}</ZailaText>
			{type === 'regular' ? <Image source={BtnRightTag} /> : <Image source={Void} style={styles.void} />}
		</TouchableOpacity>
	)
}

export default ZailaButton

const styles = StyleSheet.create({
	btn: {
		// Size and Spacing
		minWidth: '50%',
		paddingTop: 5,
		paddingBottom: 5,
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
	btnText: { textAlign: 'center', color: colors.claret },
	icons: {
		marginLeft: 5
	},
	void: {
		marginRight: 5
	}
})
