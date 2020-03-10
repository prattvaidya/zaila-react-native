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
        get(`exhibition/${route.params.exhibitionId}`)
        .then(result => {
            console.log(result)
            setExhibitionDetail(result.exhibition)
			setGetDetail(true)
        })
        
	}, [])

	const dimensions = Dimensions.get('window')
	const imageHeight = Math.round((dimensions.width * 9) / 16)
	const imageWidth = (dimensions.width-16)
	const descriptionHeight = dimensions.height * 0.4

	const renderDetail = getDetail ? (
		<View style={[styles.detailContainer,{height:dimensions.height}]}>
        <View style={styles.detailHeader}>
            <View style={styles.detailHeaderTextContainer}>
            <Text style={styles.title}>{exhibitionDetail.name}</Text>
            <Text style={styles.datePeriod}>{moment(exhibitionDetail.startDate).format("MMMM Do, YYYY")} - {moment(exhibitionDetail.endDate).format("MMMM Do, YYYY")}</Text>
            </View>
            <View style={styles.thumbnailContainer}>
                <Image 
                style={{ height: imageHeight, width: imageWidth ,borderRadius:10 }}
                source={{uri:exhibitionDetail.imageURL}}/>
            </View>
            {/* <Text>{exhibitionDetail.exhibitionProgress}</Text> */}
        </View>
        <View style={[styles.descriptionContainer,{height:descriptionHeight}]}>
        <ScrollView >
        <Text style={{color:"#276180"}}>{exhibitionDetail.description.replace('\\n','\n\n')}</Text>
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
        backgroundColor:'#E7E7E7'

    },
    detailHeader:{
       backgroundColor:'#FFF6F2',
       paddingHorizontal:8,
       paddingBottom:8
    },
    detailHeaderTextContainer:{
        backgroundColor:'#88163B',
        paddingBottom:8,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        position:'relative',
        top:16,
        zIndex:10
    }
    ,
   title:{
       fontSize:30,
       textAlign:'center',
       paddingTop:8,
       color:'white',

   },
   datePeriod:{
       textAlign:'center',
       color:'white'
   },
   thumbnailContainer:{

   }
   ,
   descriptionContainer:{
       marginHorizontal:16,
       marginVertical:8,
       backgroundColor:'white',
       padding:8,
       borderRadius:10,
   }

})

export default ExhibitionDetail
