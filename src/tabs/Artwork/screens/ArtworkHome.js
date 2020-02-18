import React,{useState} from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import ScannerModal from '../components/ScannerModal';
import ArtworkInfoModal from '../components/ArtworkInfoModal';



const ArtworkHome = () => {


    const [openModal, setOpenModal] = useState(false);
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [sensorId,setSensorId] = useState(null);

    const toggleModal = ()=>{
        setOpenModal(!openModal);
    }

    const toggleArtworkModal = ()=>{
        setOpenArtworkModal(!openArtworkModal);
    }



    return ( 
        <View style={styles.container}>
        <ScannerModal setSensorId={setSensorId} toggleModal={toggleModal} toggleArtworkModal={toggleArtworkModal} isOpen={openModal}/>
        <ArtworkInfoModal sensorId={sensorId} toggleArtworkModal={toggleArtworkModal} isOpenArtworkModal={openArtworkModal}/>
        <TouchableOpacity
       
        onPress={toggleModal}
        >
        <Text  style={styles.button}>Scan QR code</Text>
        </TouchableOpacity>

        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:"100%"
    },
    button:{
        backgroundColor:'hotpink',
        color:'white',
        fontSize:20,
        padding:10,
    }
})
 
export default ArtworkHome;