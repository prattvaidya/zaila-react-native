import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { get } from 'zaila/src/services/zaila-api.js';
import Loading from '../../../shared/Loading';
import ArtworkDetail from 'zaila/src/tabs/Artwork/components/ArtworkDetail';
import BottomSpeaker from './BottomSpeaker';
import ImageView from 'react-native-image-viewing';

import { FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

// Core components
import ZailaText from 'zaila/src/core/ZailaText';

const ArtworkInfoModal = ({
  sensorId,
  isOpenArtworkModal,
  toggleArtworkModal,
  toggleBadgePopup
}) => {
  const [isReady, setIsReady] = useState(false);
  const [preferLang, setPreferLang] = useState('en-US');
  const [artworkInfo, setArtworkInfo] = useState({});

  //For image view
  const [visible, setIsVisible] = useState(false);

  //Get user preferred language
  SecureStore.getItemAsync('preferLang').then((value) => {
    if (value) {
      setPreferLang(value);
    }
  });

  useEffect(() => {
    const receiveSensorId = sensorId ? sensorId : 'n124';

    get(`api/artwork/?sensorId=${receiveSensorId}`)
      .then((result) => {
        setArtworkInfo(result.artwork);
        setIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sensorId]);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;

  const handleCloseModal = () => {
    toggleArtworkModal();
    toggleBadgePopup();
    console.log('close');
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpenArtworkModal}
      style={styles.modalContainer}
    >
      {isReady ? (
        <View style={styles.artworkBlock}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              style={{
                height: imageHeight,
                width: imageWidth - 16,
                marginTop: 32,
                borderRadius: 10
              }}
              source={{
                uri: artworkInfo.imageURL
              }}
            />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.artworkBasicInfo}>
              <ZailaText bold style={styles.artworkTitle}>
                {artworkInfo.title}
              </ZailaText>
              <ZailaText style={styles.artistName}>
                {artworkInfo.artistName} - {artworkInfo.year}
              </ZailaText>
            </View>
            <ArtworkDetail
              preferLang={preferLang}
              descriptionInfo={artworkInfo.artworkDetails}
            />
          </View>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <FontAwesome name="close" size={16} color="#F79839" />
          </TouchableHighlight>
          <BottomSpeaker
            title={artworkInfo.title}
            artist={artworkInfo.artistName}
            content={artworkInfo.artworkDetails}
            preferLang={preferLang}
          />
          <ImageView
            images={[
              {
                uri: artworkInfo.imageURL
              }
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    position: 'relative',
    backgroundColor: '#E7E7E7'
  },
  artworkBlock: {
    position: 'relative',
    height: '100%',
    marginHorizontal: 8
  },
  infoContainer: {
    width: '100%',
    height: '52%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 8
  },
  artworkBasicInfo: {
    borderBottomWidth: 2,
    borderBottomColor: '#F79839',
    marginHorizontal: 8
  },
  artworkTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#276180',
    fontWeight: 'bold'
  },
  artistName: {
    textAlign: 'center',
    color: '#276180',
    fontSize: 15,
    marginBottom: 8
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#F79839',
    borderWidth: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ArtworkInfoModal;
