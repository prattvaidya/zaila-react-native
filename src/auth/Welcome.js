// React and React Native
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

// Images
import ZailaTextLogo from 'zaila/assets/img/zaila-text.png'
import Zaila from 'zaila/assets/img/zaila.png'

// Global Styles
import { colors } from 'zaila/styles/global'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaButton from 'zaila/src/core/ZailaButton'

// Components
import Login from 'zaila/src/auth/components/Login'

const Welcome = ({ setSignedIn }) => {
	const [selection, setSelection] = useState('welcome')

	const authenticate = () => {
		setSignedIn(true)
	}

	return (
		<View style={styles.container}>
			<Image source={ZailaTextLogo} />

			{/* Display initially: Zaila's image, Login and Signup buttons */}
			{selection === 'welcome' && (
				<>
					<Image source={Zaila} style={styles.zaila} />
					<View styles={styles.btnContainer}>
						<ZailaButton style={styles.btn} onPress={() => setSelection('login')}>
							Login
						</ZailaButton>
						<ZailaButton style={styles.btn} onPress={authenticate}>
							Signup
						</ZailaButton>
					</View>
				</>
			)}

			{/* Displayed when the Login button is pressed */}
			{selection === 'login' && <Login onSuccess={authenticate} />}

			{/* Displayed when the Signup button is pressed */}
			{selection === 'signup' && <></>}
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
	}
})
