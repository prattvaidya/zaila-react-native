import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { get } from 'zaila/src/services/zaila-api.js'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

import { colors } from 'zaila/styles/global'

const MuseumList = ({ city, navigation, searchQuery }) => {
	const [museums, setMuseums] = useState([])

	useEffect(() => {
		if (city) {
			get(`api/museum?city=Vancouver`)
				// get(`museum?city=${city}`)
				.then(res => setMuseums(res))
				// .then(res => setMuseums(staticMuseums))
				.catch(err => console.log(err))
		}
	}, [city])

	return (
		<View style={styles.museumListContainer}>
			<ScrollView bounces="false" showsVerticalScrollIndicator="false">
				{museums &&
					museums.map(({ museum }, index) => {
						return (
							(museum.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') && (
								<TouchableOpacity
									key={museum.museumId}
									onPress={() => {
										navigation.navigate('MuseumDetail', {
											museumId: museum.museumId
										})
									}}
									style={index === museums.length - 1 ? { paddingBottom: 400 } : {}}
								>
									<View style={[styles.museum]}>
										<View style={[styles.museumHeader]}>
											<ZailaText style={[styles.museumName, styles.alignCenter]}>{museum.name}</ZailaText>
											<ZailaText style={[styles.paraTextSize, styles.alignCenter, styles.museumAddr]}>
												{museum.address} - {museum.city}, {museum.province}
											</ZailaText>
										</View>
										<View style={[styles.museumInfo]}>
											<View style={[styles.museumImgWrapper]}>
												<Image style={styles.museumImg} source={{ uri: museum.imageURL }} />
												{museum.museum_category.imageURL ? (
													<Image style={[styles.museumCategoryImg]} source={{ uri: museum.museum_category.imageURL }} />
												) : (
													<></>
												)}
											</View>
											<View style={[styles.museumDescWrapper]}>
												{/* <ZailaText style={styles.paraTextSize}>{museum.description}</ZailaText>
										<View> */}
												<ZailaText style={[styles.paraTextSize, styles.featuredHeading]} weight="bold">
													Current featuring:
												</ZailaText>
												<ZailaText style={[styles.paraTextSize, styles.exhibitionInfo]}>
													Cindy Sherman and 3 more Exhibitions
												</ZailaText>
												{/* </View> */}
											</View>
										</View>
									</View>
								</TouchableOpacity>
							)
						)
					})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	museumListContainer: {
		padding: 20
	},
	museum: {
		marginBottom: 15
	},
	alignCenter: {
		textAlign: 'center'
	},
	museumHeader: {
		backgroundColor: colors.claret,
		padding: 5,
		borderRadius: 10,
		zIndex: 1,
		borderWidth: 1.5,
		borderColor: colors.seaBuckthorn
	},
	museumName: {
		fontSize: 24,
		color: 'white'
	},
	museumAddr: {
		color: 'white'
	},
	paraTextSize: {
		fontSize: 12
	},
	museumInfo: {
		flex: 1,
		flexDirection: 'row'
	},
	museumImgWrapper: {
		flexBasis: '20%',
		zIndex: 2
	},
	museumImg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 1.5,
		borderColor: colors.seaBuckthorn
	},
	museumCategoryImg: {
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: colors.seaBuckthorn,
		position: 'absolute',
		left: 0,
		bottom: 0
	},
	museumDescWrapper: {
		backgroundColor: '#E5E5E5',
		padding: 10,
		paddingTop: 15,
		paddingLeft: 60,
		flexBasis: '75%',
		flexGrow: 1,
		zIndex: 0,
		borderRadius: 10,
		marginTop: -10,
		marginLeft: -25,
		justifyContent: 'center',
		borderWidth: 1.5,
		borderColor: colors.seaBuckthorn
	},
	featuredHeading: {
		textAlign: 'center',
		fontSize: 14,
		color: colors.bdazzledBlue
	},
	exhibitionInfo: {
		textAlign: 'center',
		fontSize: 14,
		color: colors.bdazzledBlue
	}
})

export default MuseumList
