import React from 'react'
import { View, StyleSheet } from 'react-native'

// Core components
import ZailaTextInput from 'zaila/src/core/ZailaTextInput'

import { colors } from 'zaila/styles/global'

const SearchMuseums = ({ searchQuery, setSearchQuery }) => (
	<View style={styles.searchContainer}>
		<ZailaTextInput
			onChangeText={setSearchQuery}
			placeholder="Search by museum name"
			placeholderTextColor="rgb(39,97,128)"
			style={styles.searchBox}
			value={searchQuery}
		/>
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
		color: colors.bdazzledBlue
	}
})

export default SearchMuseums
