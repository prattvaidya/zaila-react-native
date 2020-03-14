import React from 'react'
import { StyleSheet, View } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaButton from 'zaila/src/core/ZailaButton'

// Global Styles
import { colors } from 'zaila/styles/global'

const Login = ({ onSuccess: handleLogin }) => {
	return (
		<View style={styles.container}>
			<ZailaText style={styles.header}>Login</ZailaText>
			<ZailaButton onPress={handleLogin}>Email</ZailaButton>
			<ZailaButton onPress={handleLogin}>Google</ZailaButton>
		</View>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		// Spacing
		padding: 20,

		// Border
		borderColor: colors.seaBuckthorn,
		borderWidth: 1.5,
		borderRadius: 20
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.bdazzledBlue,
		textAlign: 'center'
	}
})
