import React from 'react'
import { View, StyleSheet } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const SearchMuseums = () => (
	<View style={styles.searchContainer}>
		<ZailaText style={styles.searchBox}>Search by Museum Name</ZailaText>
	</View>
)

const styles = StyleSheet.create({
	searchContainer: {
		paddingLeft: 20,
		paddingRight: 20
	},
	searchBox: {
		padding: 5,
		borderWidth: 1,
		backgroundColor: 'white',
		borderColor: 'white'
	}
})

export default SearchMuseums
