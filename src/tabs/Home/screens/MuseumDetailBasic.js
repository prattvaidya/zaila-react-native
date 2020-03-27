// React and React Native
import React, { useState, useEffect } from 'react'
import { Image, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

// Services
import { get } from 'zaila/src/services/zaila-api.js'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

// Components
import Loading from 'zaila/src/shared/Loading'
import MuseumInfo from 'zaila/src/tabs/Home/components/MuseumDetail/MuseumInfo'

// Other
import { formatDate } from 'zaila/src/shared/Helper'
import { colors } from 'zaila/styles/global'

const MuseumDetail = ({ route, navigation }) => {
	const [museum, setMuseum] = useState(undefined)
	const [museumInfo, setMuseumInfo] = useState(undefined)

	useEffect(() => {
		get(`api/museum/${route.params.museumId}`)
			.then(res => {
				console.log('Museum Detail', res)
				setMuseum(res)

				// Bundle the properties that need to be sent to the MuseumInfo component
				// The following code cherry picks the properties that are needed
				setMuseumInfo(
					(({ name, imageURL, address, city, province, museum_category }) => ({
						name,
						imageURL,
						address,
						city,
						province,
						museum_category
					}))(res.museum)
				)
				// console.log(museumInfo)
			})
			.catch(err => console.log(err))
	}, [])

	return !museum || !museumInfo ? (
		<Loading />
	) : (
		<View>
			<MuseumInfo museum={museumInfo} />
			<View>
				<ZailaText style={styles.header} weight="bold">
					Current Exhibitions
				</ZailaText>
				<ScrollView bounces="false" showsVerticalScrollIndicator="false" style={styles.exhibitionsContainer}>
					{museum.museum.exhibitionsList.map((exhibition, index) => (
						<TouchableOpacity
							key={exhibition.exhibitionId}
							onPress={() => {
								navigation.navigate('ExhibitionDetail', {
									exhibitionId: exhibition.exhibitionId
								})
							}}
							style={index === museum.museum.exhibitionsList.length - 1 ? { paddingBottom: 700 } : {}}
						>
							<View style={[styles.exhibition]}>
								<View style={[styles.exhibitionHeader]}>
									<ZailaText style={[styles.exhibitionName]} weight="semiBold">
										{exhibition.name.substring(0, 20) + '...'}
									</ZailaText>
								</View>
								<View style={[styles.exhibitionInfo]}>
									<View style={[styles.exhibitionImgWrapper]}>
										<Image style={styles.exhibitionImg} source={{ uri: exhibition.imageURL }} />
										<Image style={styles.exhibitionCatImg} source={{ uri: exhibition.exhibition_category.imageURL }} />
									</View>
									<View style={[styles.exhibitionDescWrapper]}>
										<ZailaText style={[styles.exhibitionDate]} weight="light">
											{formatDate(exhibition.startDate).toUpperCase()} - {formatDate(exhibition.endDate.toUpperCase())}
										</ZailaText>
										<ZailaText style={[styles.paraTextSize, styles.exhibitionDesc]}>
											{exhibition.description.substring(0, 150)}...more
										</ZailaText>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		fontSize: 16,
		paddingTop: 5,
		textAlign: 'center',
		color: colors.bdazzledBlue
	},
	exhibitionsContainer: {
		marginLeft: 20,
		marginRight: 20
	},
	exhibition: {
		marginBottom: 15
	},
	alignCenter: {
		textAlign: 'center'
	},
	exhibitionHeader: {
		backgroundColor: colors.claret,
		padding: 5,
		borderRadius: 10,
		zIndex: 1,
		alignSelf: 'flex-start',
		borderColor: colors.seaBuckthorn,
		borderWidth: 1.5,
		width: '75%',
		position: 'absolute',
		paddingBottom: 50
	},
	exhibitionName: {
		fontSize: 18,
		color: 'white',
		paddingLeft: 50,
		paddingBottom: 10
	},
	paraTextSize: {
		fontSize: 12
	},
	exhibitionInfo: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 50,
		zIndex: 5
	},
	exhibitionDate: {
		color: colors.bdazzledBlue,
		fontSize: 12,
		textAlign: 'center'
	},
	exhibitionImgWrapper: {
		flexBasis: '20%',
		zIndex: 2
	},
	exhibitionImg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 1.5,
		borderColor: colors.seaBuckthorn,
		zIndex: 3
	},
	exhibitionCatImg: {
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: colors.seaBuckthorn,
		position: 'absolute',
		left: 0,
		bottom: 0,
		zIndex: 6
	},
	exhibitionDescWrapper: {
		backgroundColor: 'white',
		padding: 10,
		paddingLeft: 50,
		flexBasis: '75%',
		flexGrow: 1,
		zIndex: 0,
		borderRadius: 10,
		marginTop: -5,
		marginLeft: -15,
		justifyContent: 'space-between',
		width: '95%',
		borderColor: colors.seaBuckthorn,
		borderWidth: 1.5
	},
	exhibitionDesc: {
		color: colors.bdazzledBlue
	}
})

export default MuseumDetail
