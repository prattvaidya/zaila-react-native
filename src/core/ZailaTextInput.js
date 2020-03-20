import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

// Global Styles
import { colors } from 'zaila/styles/global'

const ZailaTextInput = ({ placeholder, secureTextEntry, value, onChangeText: handleChangeText }) => {
	return (
		<View>
			<TextInput
				onChangeText={handleChangeText}
				placeholder={placeholder}
				placeholderTextColor="rgba(183, 114, 137, 0.8)"
				secureTextEntry={secureTextEntry}
				style={styles.textInput}
				value={value}
			/>
		</View>
	)
}

export default ZailaTextInput

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1.5,
		borderRadius: 30,
		borderColor: colors.seaBuckthorn,
		padding: 7,
		color: colors.claret,
		opacity: 0.8
	}
})
