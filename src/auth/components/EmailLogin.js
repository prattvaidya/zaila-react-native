// React, React Native and Expo
import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Crypto from 'expo-crypto'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaTextInput from 'zaila/src/core/ZailaTextInput'
import ZailaButton from 'zaila/src/core/ZailaButton'

import { post } from 'zaila/src/services/zaila-api.js'

// Global Styles
import { colors } from 'zaila/styles/global'

const EmailLogin = ({ onSuccess: authenticate }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSuccess = async () => {
		// Encrypt the password
		const encryptedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)

		// Login
		post('auth/login', { password: encryptedPassword, email: email })
			.then(res => {
				console.log('Login data', res)
				if (res.user) {
					authenticate(res.token)
				}
			})
			.catch(err => {
				const errMsgs = err.response.data.errors.map(error => error.msg.charAt(0).toUpperCase() + error.msg.slice(1))
				const errDesc = errMsgs.join(', ')
				Alert.alert('Login Failed', errDesc)
			})
	}

	return (
		<View style={styles.container}>
			<ZailaText style={styles.header} weight="bold">
				Login
			</ZailaText>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Email</ZailaText>
				<ZailaTextInput
					autoCapitalize="none"
					autoFocus
					placeholder="example@zaila.ca"
					value={email}
					onChangeText={setEmail}
				/>
			</View>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Password</ZailaText>
				<ZailaTextInput
					autoCapitalize="none"
					placeholder="********"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<ZailaText style={styles.forgotPassword}>Forgot Password?</ZailaText>
			<ZailaButton onPress={handleSuccess} style={styles.btnConfirm}>
				Confirm
			</ZailaButton>
			<View style={styles.formControl}></View>
		</View>
	)
}

export default EmailLogin

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
	},
	formControl: {
		marginTop: 10,
		marginBottom: 15
	},
	formLabel: {
		textAlign: 'center',
		color: colors.claret
	},
	forgotPassword: {
		fontSize: 10,
		textAlign: 'center',
		color: colors.bdazzledBlue
	},
	btnConfirm: {
		marginTop: 40
	}
})
