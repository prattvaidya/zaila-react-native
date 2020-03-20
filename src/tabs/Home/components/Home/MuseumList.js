import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { get } from 'zaila/src/services/zaila-api.js'
import staticMuseums from 'zaila/src/static/museums'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

import { colors } from 'zaila/styles/global'

const MuseumList = ({ city, navigation }) => {
	const [scrollOffsetY, setScrollOffsetY] = useState(0)
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

	const padding = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		const pos = y - scroll
		const cutoff = 400
		return {
			marginLeft: !y && index > 2 ? '50%' : pos > cutoff ? `${110 - (cutoff / pos) * 100}%` : 0
		}
	}

	const descVisibility = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		return {
			display: y - scroll > 425 || (!y && index > 2) ? 'none' : 'flex'
		}
	}

	const imgAlignment = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		return y - scroll > 425 || (!y && index > 2) ? { justifyContent: 'center' } : {}
	}

	const imgInnerAlignment = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		return y - scroll > 425 || (!y && index > 2) ? { flex: 1, alignItems: 'center' } : {}
	}

	const headerFont = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		return y - scroll > 425 || (!y && index > 2) ? { fontSize: 12 } : { fontSize: 24 }
	}

	const addrFont = (museumId, scroll, index) => {
		const y = museums.find(({ museum }) => museum.museumId === museumId).y
		return y - scroll > 425 || (!y && index > 2) ? { fontSize: 10 } : { fontSize: 12 }
	}

	return (
		<View style={styles.museumListContainer}>
			<ScrollView
				bounces="false"
				showsVerticalScrollIndicator="false"
				onScroll={event => {
					setScrollOffsetY(event.nativeEvent.contentOffset.y)
				}}
				scrollEventThrottle={16}
			>
				{museums &&
					museums.map(({ museum }, index) => (
						<TouchableOpacity
							key={museum.museumId}
							onPress={() => {
								navigation.navigate('MuseumDetail', {
									museumId: museum.museumId
								})
							}}
							onLayout={event => {
								museums.find(({ museum: m }) => m.museumId === museum.museumId).y = event.nativeEvent.layout.y
								setMuseums(museums)
							}}
						>
							<View style={[styles.museum, padding(museum.museumId, scrollOffsetY, index)]}>
								<View style={[styles.museumHeader]}>
									<ZailaText
										style={[styles.museumName, styles.alignCenter, headerFont(museum.museumId, scrollOffsetY, index)]}
									>
										{museum.name}
									</ZailaText>
									<ZailaText
										style={[
											styles.paraTextSize,
											styles.alignCenter,
											styles.museumAddr,
											addrFont(museum.museumId, scrollOffsetY, index)
										]}
									>
										{museum.address} - {museum.city}, {museum.province}
									</ZailaText>
								</View>
								<View style={[styles.museumInfo, imgAlignment(museum.museumId, scrollOffsetY, index)]}>
									<View style={[styles.museumImgWrapper, imgInnerAlignment(museum.museumId, scrollOffsetY, index)]}>
										<Image style={styles.museumImg} source={{ uri: museum.imageURL }} />
									</View>
									<View style={[styles.museumDescWrapper, descVisibility(museum.museumId, scrollOffsetY, index)]}>
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
					))}
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
