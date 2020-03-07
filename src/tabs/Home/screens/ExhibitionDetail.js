import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import ZailaGirlMenu from 'zaila/src/shared/ZailaGirlMenu';
import Loading from 'zaila/src/shared/Loading'
import moment from 'moment'
// Services
import { get } from 'zaila/src/services/zaila-api.js';

const ExhibitionDetail = ({ route }) => {
	const [exhibitionDetail, setExhibitionDetail] = useState({})
	const [getDetail, setGetDetail] = useState(false)

	useEffect(() => {
		// const URL = `https://zaila-backend.herokuapp.com/api/exhibition/${route.params.exhibitionId}`
		// axios
		// 	.get(URL, {
		// 		// headers: {   "X-Custom-Header": "foobar" }
		// 	})
		// 	.then(response => {
		// 		if (response.status === 200) {
		// 			console.log(response.data.data)
		// 			setExhibitionDetail(response.data.data.exhibition)
		// 			setGetDetail(true)
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
        //     })
        get(`exhibition/${route.params.exhibitionId}`)
        .then(result => {
            console.log(result)
            setExhibitionDetail(result.exhibition)
			setGetDetail(true)
        })
        
	}, [])

	const dimensions = Dimensions.get('window')
	const imageHeight = Math.round((dimensions.width * 9) / 16)
	const imageWidth = dimensions.width
	const descriptionHeight = dimensions.height * 0.4

	const renderDetail = getDetail ? (
		<View style={[styles.detailContainer,{height:dimensions.height}]}>
        <View style={styles.detailHeader}>
            <Text style={styles.title}>{exhibitionDetail.name}</Text>
            <Text style={styles.datePeriod}>{moment(exhibitionDetail.startDate).format("MMMM Do, YYYY")} - {moment(exhibitionDetail.endDate).format("MMMM Do, YYYY")}</Text>
            <View style={styles.thumbnailContainer}>
                <Image 
                style={{ height: imageHeight, width: imageWidth }}
                source={{uri:exhibitionDetail.imageURL}}/>
            </View>
            {/* <Text>{exhibitionDetail.exhibitionProgress}</Text> */}
        </View>
        <View style={[styles.descriptionContainer,{height:descriptionHeight}]}>
        <ScrollView >
        <Text >{exhibitionDetail.description.replace('\\n','\n\n')}</Text>
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
    detailContainer:{
        // position:'relative',
        // flex:1
    },
    detailHeader:{
       backgroundColor:'lightgrey',
    }
    ,
   title:{
       fontSize:30,
       textAlign:'center',
       textTransform:'uppercase',
       paddingTop:16

   },
   datePeriod:{
       textAlign:'center',
       textTransform:'uppercase'
   },
   thumbnailContainer:{

   }
   ,
   descriptionContainer:{
       marginHorizontal:16,
       marginVertical:8,
       backgroundColor:'lightgrey',
       padding:8,
       borderRadius:10,
   }

})

export default ExhibitionDetail
