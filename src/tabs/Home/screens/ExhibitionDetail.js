import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import Loading from 'zaila/src/shared/Loading'
import axios from 'axios'
import moment from 'moment'

const ExhibitionDetail = ({ route }) => {
	const [exhibitionDetail, setExhibitionDetail] = useState({})
	const [getDetail, setGetDetail] = useState(false)

	useEffect(() => {
		const URL = `https://zaila-backend.herokuapp.com/api/exhibition/${route.params.exhibitionId}`
		axios
			.get(URL, {
				// headers: {   "X-Custom-Header": "foobar" }
			})
			.then(response => {
				if (response.status === 200) {
					console.log(response.data.data)
					setExhibitionDetail(response.data.data.exhibition)
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
	const descriptionHeight = dimensions.height * 0.4

	const renderDetail = getDetail ? (
		<View style={styles.detailContainer}>
			<View style={styles.detailHeader}>
				<Text style={styles.title}>{exhibitionDetail.name}</Text>
				<Text style={styles.datePeriod}>
					{moment(exhibitionDetail.startDate).format('MMMM Do, YYYY')} -{' '}
					{moment(exhibitionDetail.endDate).format('MMMM Do, YYYY')}
				</Text>
				<View style={styles.thumbnailContainer}>
					<Image style={{ height: imageHeight, width: imageWidth }} source={{ uri: exhibitionDetail.imageURL }} />
				</View>
			</View>
			<View style={[styles.descriptionContainer, { height: descriptionHeight }]}>
				<ScrollView>
					<Text>{exhibitionDetail.description.replace('\\n', '\n\n')}</Text>
				</ScrollView>
			</View>
		</View>
	) : (
		<Loading />
	)

	return <View>{renderDetail}</View>
}

const styles = StyleSheet.create({
	detailContainer: {},
	detailHeader: {},
	title: {
		fontSize: 30,
		textAlign: 'center',
		textTransform: 'uppercase'
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
