import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { get } from 'zaila/src/services/zaila-api.js'
import staticMuseums from 'zaila/src/static/museums'

const MuseumList = ({ city, navigation }) => {
	const [scrollOffsetY, setScrollOffsetY] = useState(0)
	const [museums, setMuseums] = useState([])

	useEffect(() => {
		if (city) {
			get(`museum?city=${city}`)
				.then(res => setMuseums(staticMuseums.map(m => ({ ...m, ref: React.createRef() }))))
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

		// const y = museums.find(({ museum }) => museum.museumId === museumId).y
		// const pos = y - scroll
		// const cutoff = 350
		// return {
		// 	marginLeft: pos > cutoff || (!y && index > 2) ? `${100 - (cutoff / pos) * 100}%` : 0
		// }
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

	const onViewRef = React.useRef(viewableItems => {
		// console.log('Visible items are', viewableItems)
		// console.log('Changed in this iteration', changed)
	})
	const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

	return (
		<View style={styles.museumContainer}>
			<Text style={styles.searchBox}>Placeholder for Search by Museum Name</Text>

			<FlatList
				data={museums}
				keyExtractor={item => item.museum.museumId.toString()}
				onViewableItemsChanged={onViewRef.current}
				viewabilityConfig={viewConfigRef.current}
				onScroll={event => {
					setScrollOffsetY(event.nativeEvent.contentOffset.y)
				}}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					// console.log(index)
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('ExhibitionDetail')
							}}
							// ref={r => (museums.find(({ museum: m }) => m.museumId === item.museum.museumId).ref = r)}
							ref={item.ref}
							onLayout={event => {
								item.ref.current.measure((fx, fy, width, height, px, py) => {
									console.log('Component width is: ' + width)
									console.log('Component height is: ' + height)
									console.log('X offset to frame: ' + fx)
									console.log('Y offset to frame: ' + fy)
									console.log('X offset to page: ' + px)
									console.log('Y offset to page: ' + py)
									museums.find(({ museum: m }) => m.museumId === item.museum.museumId).y = py
									setMuseums(museums)
								})
							}}
						>
							<View style={[styles.museum, padding(item.museum.museumId, scrollOffsetY, index)]}>
								<View style={[styles.museumHeader]}>
									<Text
										style={[
											styles.museumName,
											styles.alignCenter,
											headerFont(item.museum.museumId, scrollOffsetY, index)
										]}
									>
										{item.museum.name}
									</Text>
									<Text
										style={[
											styles.paraTextSize,
											styles.alignCenter,
											addrFont(item.museum.museumId, scrollOffsetY, index)
										]}
									>
										{item.museum.address} - {item.museum.city}, {item.museum.province}
									</Text>
								</View>
								<View style={[styles.museumInfo, imgAlignment(item.museum.museumId, scrollOffsetY, index)]}>
									<View
										style={[styles.museumImgWrapper, imgInnerAlignment(item.museum.museumId, scrollOffsetY, index)]}
									>
										<Image style={styles.museumImg} source={{ uri: item.museum.imageURL }} />
									</View>
									<View style={[styles.museumDescWrapper, descVisibility(item.museum.museumId, scrollOffsetY, index)]}>
										<Text style={styles.paraTextSize}>{item.museum.description}</Text>
										<View>
											<Text style={[styles.paraTextSize, styles.featuredHeading]}>Current featuring:</Text>
											<Text style={styles.paraTextSize}>Cindy Sherman and 3 more Exhibitions</Text>
										</View>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)
				}}
			/>

			{/* <ScrollView
        style={styles.museumList}
        onScroll={event => {
          setScrollOffsetY(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={1}
      >
        {museums.map(({ museum }, index) => (
          <TouchableOpacity
            key={museum.museumId}
            onPress={() => {
              navigation.navigate("ExhibitionDetail");
            }}
            onLayout={event => {
              museums.find(
                ({ museum: m }) => m.museumId === museum.museumId
              ).y = event.nativeEvent.layout.y;
              setMuseums(museums);
            }}
          >
            <View
              style={[
                styles.museum,
                padding(museum.museumId, scrollOffsetY, index)
              ]}
            >
              <View style={[styles.museumHeader]}>
                <Text
                  style={[
                    styles.museumName,
                    styles.alignCenter,
                    headerFont(museum.museumId, scrollOffsetY, index)
                  ]}
                >
                  {museum.name}
                </Text>
                <Text
                  style={[
                    styles.paraTextSize,
                    styles.alignCenter,
                    addrFont(museum.museumId, scrollOffsetY, index)
                  ]}
                >
                  {museum.address} - {museum.city}, {museum.province}
                </Text>
              </View>
              <View
                style={[
                  styles.museumInfo,
                  imgAlignment(museum.museumId, scrollOffsetY, index)
                ]}
              >
                <View
                  style={[
                    styles.museumImgWrapper,
                    imgInnerAlignment(museum.museumId, scrollOffsetY, index)
                  ]}
                >
                  <Image
                    style={styles.museumImg}
                    source={{ uri: museum.imageURL }}
                  />
                </View>
                <View
                  style={[
                    styles.museumDescWrapper,
                    descVisibility(museum.museumId, scrollOffsetY, index)
                  ]}
                >
                  <Text style={styles.paraTextSize}>{museum.description}</Text>
                  <View>
                    <Text style={[styles.paraTextSize, styles.featuredHeading]}>
                      Current featuring:
                    </Text>
                    <Text style={styles.paraTextSize}>
                      Cindy Sherman and 3 more Exhibitions
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
		</View>
	)
}

const styles = StyleSheet.create({
	searchBox: {
		padding: 10,
		borderWidth: 1
	},
	museumList: {
		paddingTop: 20
	},
	museum: {
		marginBottom: 15
	},
	alignCenter: {
		textAlign: 'center'
	},
	museumHeader: {
		backgroundColor: '#C7C7C7',
		padding: 5,
		borderRadius: 10,
		zIndex: 1
	},
	museumName: {
		fontSize: 24
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
		borderWidth: 4,
		borderColor: '#E5E5E5'
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
		justifyContent: 'space-between'
	},
	featuredHeading: {
		fontWeight: 'bold'
	}
})

export default MuseumList
