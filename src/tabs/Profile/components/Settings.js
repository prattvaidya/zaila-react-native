import React from 'react'
import { View } from 'react-native'
import * as SecureStore from 'expo-secure-store'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaButton from 'zaila/src/core/ZailaButton'

const Settings = () => {
	const logout = () => {
		SecureStore.deleteItemAsync('id_token')
	}

	return (
		<View>
			<ZailaButton style={{ backgroundColor: 'white' }}>Report Bug</ZailaButton>
			<ZailaButton style={{ backgroundColor: 'white' }}>Contact Zaila</ZailaButton>
			<ZailaButton onPress={logout} style={{ backgroundColor: 'white' }}>
				Logout
			</ZailaButton>
		</View>
	)
}

export default Settings
