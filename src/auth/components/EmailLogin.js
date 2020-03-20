import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'

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

	const handleSuccess = () => {
		post('auth/login', { password: password, email: email })
			.then(res => {
				if (res.user) {
					SecureStore.setItemAsync('id_token', res.token)
					authenticate()
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<View style={styles.container}>
			<ZailaText style={styles.header} weight="bold">
				Login
			</ZailaText>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Email</ZailaText>
				<ZailaTextInput placeholder="example@zaila.ca" value={email} onChangeText={setEmail} />
			</View>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Password</ZailaText>
				<ZailaTextInput placeholder="********" secureTextEntry={true} value={password} onChangeText={setPassword} />
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
