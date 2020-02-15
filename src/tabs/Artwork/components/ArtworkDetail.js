import React, {useState ,useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import * as Speech from 'expo-speech';
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

    },[languageType])

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



    const speak = (content, languageCode) => {
        const thingToSay = content;
        Speech.speak(thingToSay, {language: languageCode});
    }


    return (
        <View>
            <RNPickerSelect
                placeholder={{label:"Select Language",value:"en-US"}}
                onValueChange={(value) => setLanguageType(value)}
                items={languageList}/> 
                <Text >{content}</Text>
                <Button
                    onPress={() => speak(content, languageType)}
                    title="Play"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
})

export default ArtworkDetail;