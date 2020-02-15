import React,{useState} from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import ScannerModal from '../components/ScannerModal';


const ArtworkHome = () => {


    const [openModal, setOpenModal] = useState(false);

    const toggleModal = ()=>{
        setOpenModal(!openModal);
    }



    return ( 
        <View style={styles.container}>
        <ScannerModal toggleModal={toggleModal}  isOpen={openModal}/>
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