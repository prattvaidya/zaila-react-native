import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import Loading from 'zaila/src/shared/Loading'
import ZailaGirlMenu from 'zaila/src/shared/ZailaGirlMenu'
import axios from 'axios'
import moment from 'moment'

// Core components
import ZailaText from 'zaila/src/core/ZailaText'

const ExhibitionDetail = () => {
	const [exhibitionDetail, setExhibitionDetail] = useState({})
	const [getDetail, setGetDetail] = useState(false)

	useEffect(() => {
		const URL = `https://zaila-backend.herokuapp.com/api/exhibition/124`
		axios
			.get(URL, {
				// headers: {   "X-Custom-Header": "foobar" }
			})
			.then(response => {
				if (response.status === 200) {
					//Change later baed on the endpoint change
					// console.log(response.data[0])
					// console.log(response.data);
					setExhibitionDetail(response.data[0].exhibition)
					setGetDetail(true)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	const dimensions = Dimensions.get('window')
	const imageHeight = Math.round((dimensions.width * 9) / 16)
	const imageWidth = dimensions.width
	const descriptionHeight = dimensions.height * 0.32

	const renderDetail = getDetail ? (
		<View style={[styles.detailContainer, { height: dimensions.height }]}>
			<View style={styles.detailHeader}>
				<ZailaText style={styles.title}>{exhibitionDetail.name}</ZailaText>
				<ZailaText style={styles.datePeriod}>
					{moment(exhibitionDetail.startDate).format('MMMM Do, YYYY')} -{' '}
					{moment(exhibitionDetail.endDate).format('MMMM Do, YYYY')}
				</ZailaText>
				<View style={styles.thumbnailContainer}>
					<Image style={{ height: imageHeight, width: imageWidth }} source={{ uri: exhibitionDetail.imageURL }} />
				</View>
				<ZailaText>{exhibitionDetail.exhibitionProgress}</ZailaText>
			</View>
			<View style={[styles.descriptionContainer, { height: descriptionHeight }]}>
				<ScrollView>
					<ZailaText>{exhibitionDetail.description.replace('\\n', '\n\n')}</ZailaText>
				</ScrollView>
			</View>
			<ZailaGirlMenu />
		</View>
	) : (
		<Loading />
	)

	return <View>{renderDetail}</View>
}

const styles = StyleSheet.create({
	detailContainer: {
		// position:'relative',
		// flex:1
		backgroundColor: '#E7E7E7'
	},
	detailHeader: {
		backgroundColor: 'white'
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		textTransform: 'uppercase',
		paddingTop: 16
	},
	datePeriod: {
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	thumbnailContainer: {},
	descriptionContainer: {
		marginHorizontal: 16,
		marginVertical: 8,
		backgroundColor: 'lightgrey',
		padding: 8,
		borderRadius: 10
	}
})

export default ExhibitionDetail
