import React, {useState ,useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import * as Speech from 'expo-speech';
import BottomSpeaker from './BottomSpeaker';
import RNPickerSelect from 'react-native-picker-select';

const ArtworkDetail = ({descriptionInfo}) => {

    const [languageType,
        setLanguageType] = useState(descriptionInfo[0].languageCode);

    const [content,setContent] = useState(descriptionInfo[0].description);
    

    useEffect(()=>{

       const info = descriptionInfo.find(item=>{
            return item.languageCode === languageType
       })
       info?setContent(info.description):setContent("");

    },[descriptionInfo])



    const languageList = [
        {
            label: "English",
            value: "en-US"
        }
        , {
            label: "French",
            value: "fr-CA"
        }, {
            label: "Chinese",
            value: "zh-CN"
        }, {
            label: "Spanish",
            value: "es-MX"
        }

    ]

    //Stop speech when component Unmounted
    useEffect(() => {
        return () => {
            Speech.stop();
        };
    })


    return (
        <View style={styles.container}>
            {/* <RNPickerSelect
                placeholder={{label:"Select Language",value:"en-US"}}
                onValueChange={(value) => setLanguageType(value)}
                items={languageList}/>  */}
                <View style={styles.scrollContainer}>
                <ScrollView >
                <Text >{content}</Text>
                </ScrollView>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position:'relative',
        width: '100%',
        height:'100%',
        
    },
    scrollContainer:{
        padding:8,
    }
})

export default ArtworkDetail;