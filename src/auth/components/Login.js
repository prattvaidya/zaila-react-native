import React from 'react'
import { StyleSheet, View } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaButton from 'zaila/src/core/ZailaButton'

// Global Styles
import { colors } from 'zaila/styles/global'

const Login = ({ onSuccess: handleLogin, selection, onSelectionChange: handleSelectionChange }) => {
	return (
		<View style={styles.container}>
			<ZailaText style={styles.header} weight="bold">
				Login
			</ZailaText>
			<ZailaButton onPress={() => handleSelectionChange('emailLogin')} type="email">
				Email
			</ZailaButton>
			<ZailaButton onPress={handleLogin} type="google">
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
