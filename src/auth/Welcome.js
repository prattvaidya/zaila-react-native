import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import WelcomeImage from 'zaila/assets/welcome.png'

const Welcome = ({ setSignedIn }) => {
	const [selection, setSelection] = useState(null)

	const authenticate = () => {
		setSignedIn(true)
	}

	return (
		<View style={styles.container}>
			<Image source={WelcomeImage} />
			<TouchableOpacity style={selection !== 'login' && styles.btn} onPress={() => setSelection('login')}>
				<Text style={selection !== 'login' && styles.btnTxt}>Login</Text>
			</TouchableOpacity>
			{selection === 'login' && (
				<>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Email</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Gmail</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Facebook</Text>
					</TouchableOpacity>
				</>
			)}
			<Text>Or</Text>
			<TouchableOpacity style={selection !== 'signup' && styles.btn} onPress={() => setSelection('signup')}>
				<Text style={selection !== 'signup' && styles.btnTxt}>Signup</Text>
			</TouchableOpacity>
			{selection === 'signup' && (
				<>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Email</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Gmail</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={authenticate}>
						<Text>Facebook</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	)
}

export default Welcome

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		padding: 15,
		width: '70%',
		borderWidth: 1,
		marginTop: 10,
		marginBottom: 10
	},
	btnTxt: { textAlign: 'center' }
})
