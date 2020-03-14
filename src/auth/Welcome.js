// React and React Native
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

// Images
import ZailaTextLogo from 'zaila/assets/img/zaila-text.png'
import Zaila from 'zaila/assets/img/zaila.png'
import BtnLeftTag from 'zaila/assets/img/btn-left-tag.png'
import BtnRightTag from 'zaila/assets/img/btn-right-tag.png'

// Global Styles
import { colors } from 'zaila/styles/global'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const Welcome = ({ setSignedIn }) => {
	const [selection, setSelection] = useState(null)

	const authenticate = () => {
		setSignedIn(true)
	}

	return (
		<View style={styles.container}>
			<Image source={ZailaTextLogo} />
			<Image source={Zaila} style={styles.zaila} />
			<View styles={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={() => setSignedIn(true)}>
					<Image source={BtnLeftTag} />
					<ZailaText style={styles.btnText}>Login</ZailaText>
					<Image source={BtnRightTag} />
				</TouchableOpacity>
				{selection === 'login' && <></>}
				<TouchableOpacity style={styles.btn} onPress={() => setSignedIn(true)}>
					<Image source={BtnLeftTag} />
					<ZailaText style={styles.btnText}>Signup</ZailaText>
					<Image source={BtnRightTag} />
				</TouchableOpacity>
				{selection === 'signup' && <></>}
			</View>
		</View>
	)
}

export default Welcome

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 50,
		paddingBottom: 50
	},
	zaila: {
		height: 250,
		width: 250,
		resizeMode: 'contain'
	},
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
	btnText: { textAlign: 'center', color: colors.carnationPink }
})
