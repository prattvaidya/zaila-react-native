import React, { useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

// Country Flags
import ca from 'zaila/assets/img/ca.png'
import ch from 'zaila/assets/img/ch.png'
import fr from 'zaila/assets/img/fr.png'
import sp from 'zaila/assets/img/sp.png'

// Colors
import { colors } from 'zaila/styles/global'

const SelectLanguage = ({ onChange: handleChange, value }) => {
	// Constants
	const languages = [
		{
			code: 'fr-CA',
			name: 'French',
			img: fr
		},
		{
			code: 'en-US',
			name: 'English',
			img: ca
		},
		{
			code: 'zh-CN',
			name: '中文',
			img: ch
		},
		{
			code: 'es-ES',
			name: 'Español',
			img: sp
		}
	]

	return (
		<View style={styles.container}>
			{languages.map(lang => (
				<TouchableOpacity style={styles.lang} onPress={() => handleChange(lang.code)} key={lang.code}>
					<View>
						<Image source={lang.img} style={value === lang.code && styles.selectedLang} />
						{!(value === lang.code) && <View style={styles.unselectedLang}></View>}
					</View>
					<ZailaText style={styles.langName} weight={value === lang.code ? 'bold' : 'regular'}>
						{lang.name}
					</ZailaText>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default SelectLanguage

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		margin: 10
	},
	lang: {
		display: 'flex',
		alignItems: 'center'
	},
	langName: {
		marginTop: 5,
		fontSize: 10,
		textAlign: 'center',
		color: colors.bdazzledBlue
	},
	selectedLang: {
		borderWidth: 1.5,
		borderRadius: 10,
		borderColor: colors.seaBuckthorn
	},
	unselectedLang: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		width: 20,
		height: 20,
		borderRadius: 10
	}
})
