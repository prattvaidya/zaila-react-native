import React from 'react'
import { View, StyleSheet } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'
import ZailaTextInput from 'zaila/src/core/ZailaTextInput'

const SearchMuseums = () => (
	<View style={styles.searchContainer}>
		<ZailaTextInput placeholder="Search by museum name" style={styles.searchBox} />
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
