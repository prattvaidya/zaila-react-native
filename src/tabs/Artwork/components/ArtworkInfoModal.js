import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, Image, Dimensions,Modal,TouchableHighlight} from "react-native";
import axios from "axios";
import Loading from '../../../shared/Loading';
import ArtworkDetail from "zaila/src/tabs/Artwork/components/ArtworkDetail";

import {globalStyles} from '../../../../styles/global';

const ArtworkInfoModal = ({sensorId,isOpenArtworkModal,toggleArtworkModal}) => {


    const [isReady,
        setIsReady] = useState(false);

    const [artworkInfo,
        setArtworkInfo] = useState({
        artworkId: null,
        exhibitionId: null,
        sensorId: "",
        title: "Hello",
        imageURL: "https://www.somewhere.com/egypt_exhibition/1.pgg",
        artistName: "",
        media: "",
        year: "",
        artworkDetails: [
            {
                artworkDetailsId: 9,
                artworkId: 1,
                description: "",
                languageCode: "en-US"
            }
        ]
    })

    useEffect(() => {
        console.log('Get ID from parent',sensorId);
        const receiveSensorId = sensorId? sensorId: 'n124';

        const URL = `https://zaila-backend.herokuapp.com/api/artwork/?sensorId=${receiveSensorId}`;
        axios
            .get(URL, {
            // headers: {   "X-Custom-Header": "foobar" }
        })
            .then(response => {
                if (response.status === 200) {
                    setArtworkInfo(response.data.data);
                    setIsReady(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [sensorId]);

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

    return (
        <Modal 
        animationType="slide"
        transparent={false}
        visible={isOpenArtworkModal}
        style={styles.modalContainer}>
            {isReady
                ? (
                    <View style={styles.artworkBlock}>
                        <Image
                               style={{ height: imageHeight, width: imageWidth }}
                            // style={styles.artworkImage}
                            source={{
                            uri: artworkInfo.imageURL
                        }}/>
                        <View style={styles.infoContainer}>
                            <Text style={styles.artworkTitle}>{artworkInfo.title}</Text>
                            <Text style={styles.artistName}>{artworkInfo.artistName}</Text>
                            <ArtworkDetail descriptionInfo={artworkInfo.artworkDetails}/>
                        </View>
                        <TouchableHighlight style={styles.closeButton} onPress={toggleArtworkModal}>
                            <Text style={[globalStyles.textWhite,styles.closeButtonText]}>X</Text>
                        </TouchableHighlight>
                    </View>
                )
                : (
                    <Loading/>
                )}

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: "100%",
        position: "relative"
    },
    artworkBlock:{
        paddingTop:20
    }
    ,
    infoContainer: {
        width: "100%",
    },
    artworkTitle: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold"
    },
    artistName: {
        textAlign: "center"
    },
    artworkImage:{
        width:300,
        height:200
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    closeButtonText:{
        fontSize:24,
        fontWeight:'bold'
    }
});

export default ArtworkInfoModal;
