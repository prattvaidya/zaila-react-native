import React from 'react'
import { View } from 'react-native'
import { globalStyles } from 'zaila/styles/global'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const ProfileTab = () => {
	return (
		<View style={globalStyles.container}>
			<ZailaText>Profile Tab</ZailaText>
		</View>
	)
}

export default ProfileTab
