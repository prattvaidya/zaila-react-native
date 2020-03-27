// React and React Native
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'

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
import EmailLogin from 'zaila/src/auth/components/EmailLogin'
import SignUp from 'zaila/src/auth/components/SignUp'

const Welcome = ({ setSignedIn }) => {
	const [selection, setSelection] = useState('welcome')

	const authenticate = token => {
		if (token) SecureStore.setItemAsync('id_token', token)
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
						<ZailaButton onPress={() => setSelection('login')}>Login</ZailaButton>
						<ZailaButton onPress={() => setSelection('signup')}>Signup</ZailaButton>
					</View>
				</>
			)}

			{/* Displayed when the Login button is pressed */}
			{selection === 'login' && (
				<Login onSuccess={authenticate} selection={selection} onSelectionChange={setSelection} />
			)}

			{/* Displayed when the Email Login method is selected */}
			{selection === 'emailLogin' && <EmailLogin onSuccess={authenticate} />}

			{/* Displayed when the Signup button is pressed */}
			{selection === 'signup' && <SignUp onSuccess={authenticate} />}

			{/* Display the back button on Login, Email Login and Signup screens */}
			{(selection === 'login' || selection === 'signup' || selection === 'emailLogin') && (
				<ZailaButton
					style={styles.backBtn}
					onPress={() => setSelection(selection === 'emailLogin' ? 'login' : 'welcome')}
				>
					Back
				</ZailaButton>
			)}
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
	backBtn: {
		width: '70%'
	}
})
