// Core
import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Google from 'expo-google-app-auth'
import { ZAILA_IOS_CLIENT_ID } from 'react-native-dotenv'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaButton from 'zaila/src/core/ZailaButton'

import { post } from 'zaila/src/services/zaila-api.js'

// Global Styles
import { colors } from 'zaila/styles/global'

const Login = ({ onSuccess: authenticate, selection, onSelectionChange: handleSelectionChange }) => {
	// Init
	let config = {
		iosClientId: ZAILA_IOS_CLIENT_ID,
		scopes: ['profile', 'email']
	}

	// Component methods
	const handleGoogleLogin = async () => {
		// Handle exception if user hits cancel while logging in with Google
		try {
			const { type, idToken } = await Google.logInAsync(config)
			// console.log(type, idToken, user)

			if (type === 'success') {
				// Try to login the user
				post('auth/login', {}, idToken)
					.then(res => {
						// Returning user. Login successful
						authenticate(res.token)
					})
					.catch(err => {
						// Sign up if the user's account doesn't exist
						return post('auth/registerUser', {}, idToken)
					})
					.then(res => {
						if (!res.errorCode && res.userId) {
							// Sign in the user
							return post('auth/login', {}, idToken)
						}
					})
					.then(res => {
						authenticate(res.token)
					})
			}
		} catch (e) {
			// User cancelled Google Login
			console.log('Google login cancelled', e.message)
		}
	}

	return (
		<View style={styles.container}>
			<ZailaText style={styles.header} weight="bold">
				Login
			</ZailaText>
			<ZailaButton onPress={() => handleSelectionChange('emailLogin')} type="email">
				Email
			</ZailaButton>
			<ZailaButton onPress={handleGoogleLogin} type="google">
				Google
			</ZailaButton>
		</View>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		// Spacing
		padding: 20,
		width: '70%',

		// Border
		borderColor: colors.seaBuckthorn,
		borderWidth: 1.5,
		borderRadius: 20
	},
	header: {
		fontSize: 20,
		color: colors.bdazzledBlue,
		textAlign: 'center',
		paddingBottom: 10
	}
})
