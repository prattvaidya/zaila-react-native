import React from 'react';
import { View,Image,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";


const ZailaGirlMenu = () => {

    const dimensions = Dimensions.get('window');

    const handleModal = ()=>{
        console.log('Hello');
    }

    return ( 
        <View style={[styles.menuContainer,{width:dimensions.width*0.35,height:dimensions.height*0.2}]}>
            <Image 
            style={styles.character}
            source={require('./assets/zaila-normal.png')}/>
            <TouchableOpacity style={[styles.button,styles.button1]} onPress={handleModal}>
                <FontAwesome name="map" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,styles.button2]} onPress={handleModal}>
                <FontAwesome name="exclamation" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,styles.button3]} onPress={handleModal}>
                <FontAwesome name="lightbulb-o" size={26} color="white" />
            </TouchableOpacity>
        </View>
     );
}
 
const styles = StyleSheet.create({
    menuContainer:{
        position:'absolute',
        bottom:6,
        right:10
    },
    character:{
        position:'absolute',
        width:60,
        height:60,
        bottom:0,
        right:0,
    },
    button:{
        backgroundColor: "#AFC9AD",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        position:'absolute',
        width:55,
        height:55
    },
    button1:{
        right:0,
        top:0
    },
    button2:{
        left:10,
        top:10
    },
    button3:{
        left:0,
        bottom:0
    }
})

export default ZailaGirlMenu;