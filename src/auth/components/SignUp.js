import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaTextInput from 'zaila/src/core/ZailaTextInput'
import ZailaButton from 'zaila/src/core/ZailaButton'
import SelectLanguage from 'zaila/src/core/SelectLanguage'

import { post } from 'zaila/src/services/zaila-api.js'

// Global Styles
import { colors } from 'zaila/styles/global'

const SignUp = ({ onSuccess: authenticate }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [language, setLanguage] = useState('en-US')

	const handleSuccess = () => {
		post('auth/registerUser', {
			user: { preferredLanguage: language, name: name, password: password, email: email, ageGroup: '1' }
		})
			.then(res => post('auth/login', { password: password, email: email }))
			.then(res => {
				if (res.user) {
					authenticate(res.token)
				}
			})
			.catch(err => {
				const errMsgs = err.response.data.errors.map(error => error.msg.charAt(0).toUpperCase() + error.msg.slice(1))
				const errDesc = errMsgs.join(', ')
				Alert.alert('Signup Failed', errDesc)
			})
	}

	return (
		<View style={styles.container}>
			<ZailaText style={styles.header} weight="bold">
				Signup
			</ZailaText>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Name</ZailaText>
				<ZailaTextInput autoCapitalize="words" autoFocus placeholder="name" value={name} onChangeText={setName} />
			</View>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Email</ZailaText>
				<ZailaTextInput autoCapitalize="none" placeholder="example@zaila.ca" value={email} onChangeText={setEmail} />
			</View>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Password</ZailaText>
				<ZailaTextInput
					autoCapitalize="none"
					placeholder="*****"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
				<ZailaText style={styles.passwordGuideline} weight="light">
					Password must be 6 characters long
				</ZailaText>
			</View>
			<View style={styles.formControl}>
				<ZailaText style={styles.formLabel}>Audio Language</ZailaText>
				<SelectLanguage value={language} onChange={setLanguage} />
			</View>
			<ZailaButton onPress={handleSuccess} style={styles.btnConfirm}>
				Confirm
			</ZailaButton>
			<View style={styles.formControl}></View>
		</View>
	)
}

export default SignUp

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
	passwordGuideline: {
		fontSize: 10,
		color: colors.bdazzledBlue
	},
	btnConfirm: {
		marginTop: 20
	}
})
