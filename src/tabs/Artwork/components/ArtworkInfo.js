import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import axios from 'axios';

import ArtworkDetail from './ArtworkDetail';

const ArtworkInfo = ({sensorId}) => {

    const [artworkInfo,
        setArtworkInfo] = useState({
        artworkId: 1,
        exhibitionId: 123,
        sensorId: "n123",
        title: "The Pharao",
        imageURL: "https://www.somewhere.com/egypt_exhibition/1.pgg",
        artistName: "Cleopatra",
        media: "PNG",
        year: "2020",
        artworkDetails: [
            {
                artworkDetailsId: 9,
                artworkId: 1,
                description: "The dog was the first animal to be domesticated, and has been selectively bred o" +
                    "ver millennia for various behaviors, sensory capabilities, and physical attribut" +
                    "es",
                languageCode: "en-US"
            }
        ]
    })

    useEffect(() => {
        // const URL = `https://zaila-backend.herokuapp.com/api/artwork/1`;
        const URL = `https://zaila-backend.herokuapp.com/api/artwork/?sensorId=${sensorId}`
        axios
            .get(URL, {
            headers: {
                'X-Custom-Header': 'foobar'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setArtworkInfo(response.data.artwork)
                    // console.log(response.data[0].artwork)
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={{
                width: 120,
                height: 120
            }}
                source={{
                uri: 'https://i.picsum.photos/id/1005/180/320.jpg'
            }}/>
            <View style={styles.infoContainer}>
                <Text style={styles.artworkTitle}>{artworkInfo.title}</Text>
                <Text style={styles.artistName}>{artworkInfo.artistName}</Text>
                <ArtworkDetail descriptionInfo={artworkInfo.artworkDetails}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%'
    },
    infoContainer: {

        width: '100%'
    },
    artworkTitle: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold'
    },
    artistName: {
        textAlign: 'center'
    }
})

export default ArtworkInfo;