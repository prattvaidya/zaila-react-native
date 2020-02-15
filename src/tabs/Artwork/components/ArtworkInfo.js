import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import axios from "axios";

import ArtworkDetail from "zaila/src/tabs/Artwork/components/ArtworkDetail";

const ArtworkInfo = ({route}) => {

    const {sensorId} = route.params;
    console.log('get id',sensorId);

   
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

    const receiveSensorId = sensorId? sensorId: 'n124';
    
    const URL = `https://zaila-backend.herokuapp.com/api/artwork/?sensorId=${receiveSensorId}`;
    axios
      .get(URL, {
        // headers: {
        //   "X-Custom-Header": "foobar"
        // }
      })
      .then(response => {
        if (response.status === 200) {
          setArtworkInfo(response.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 120,
          height: 120
        }}
        source={{
          uri: artworkInfo.imageURL
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.artworkTitle}>{artworkInfo.title}</Text>
        <Text style={styles.artistName}>{artworkInfo.artistName}</Text>
        <ArtworkDetail descriptionInfo={artworkInfo.artworkDetails} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%"
  },
  infoContainer: {
    width: "100%"
  },
  artworkTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold"
  },
  artistName: {
    textAlign: "center"
  }
});

export default ArtworkInfo;
