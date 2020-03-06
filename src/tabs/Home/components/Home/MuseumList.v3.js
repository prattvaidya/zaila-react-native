import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import staticMuseums from 'zaila/src/static/museums'

const MuseumList = () => {
	const [museums, setMuseums] = useState(staticMuseums.map(m => ({ ...m, ref: React.createRef() })))

	const onViewRef = React.useRef(({ viewableItems }) => {
		console.log('Visible items are')
		viewableItems.forEach(({ item }) => {
			item.ref.current.measure((fx, fy, width, height, px, py) => {
				console.log(item.museum.museumId, py)
				museums.find(({ museum: m }) => m.museumId === item.museum.museumId).y = py
				// museums.find(({ museum: m }) => m.museumId === item.museum.museumId).mL = py > 500 ? '50%' : 0
			})
		})
		// console.log(museums)
		// museums.forEach(m => console.log(m.y))
		// setMuseums(museums)
		// console.log('Changed in this iteration', changed)
	})
	const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

	return (
		<View style={styles.museumListContainer}>
			<FlatList
				onViewableItemsChanged={onViewRef.current}
				viewabilityConfig={viewConfigRef.current}
				data={museums}
				keyExtractor={item => item.museum.museumId.toString()}
				renderItem={({ item, index }) => (
					<TouchableOpacity ref={item.ref}>
						<View style={[styles.museum, { marginLeft: item.mL }]}>
							<View style={styles.museumHeader}>
								<Text>{item.museum.name}</Text>
								<Text>
									{item.museum.address} - {item.museum.city}, {item.museum.province}
								</Text>
							</View>
							<View style={styles.museumInfo}>
								{/* <View style={styles.museumImgWrapper}>
									<Image source={{ uri: item.museum.imageURL }} style={styles.museumImg}></Image>
								</View> */}
								<View style={styles.museumDescWrapper}>
									<Text>{item.museum.description}</Text>
									<View>
										<Text>Current featuring:</Text>
										<Text>Cindy Sherman and 3 more Exhibitions</Text>
									</View>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				)}
				bounces="false"
			></FlatList>
		</View>
	)
}

const styles = StyleSheet.create({
	museumListContainer: {
		padding: 20
	},
	museum: {
		paddingBottom: 15
	},
	museumHeader: {
		backgroundColor: '#C7C7C7',
		padding: 5,
		borderRadius: 10,
		zIndex: 1
	},
	museumInfo: {
		flex: 1,
		flexDirection: 'row'
	},
	museumImgWrapper: {
		zIndex: 2
	},
	museumImg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 4,
		borderColor: '#E5E5E5'
	}
})

export default MuseumList
