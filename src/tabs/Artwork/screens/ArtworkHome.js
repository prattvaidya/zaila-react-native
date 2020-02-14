import React,{useState} from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScannerModal from '../components/ScannerModal';


const ArtworkHome = () => {

    const navigation = useNavigation();

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = ()=>{
        setOpenModal(!openModal);
    }

    const goArtworkInfo =()=>{
        navigation.push('ArtworkInfo');
    }


    return ( 
        <View style={styles.container}>
        <ScannerModal toggleModal={toggleModal}  isOpen={openModal}/>
        <TouchableOpacity
        onPress={toggleModal}
        >
        <Text>Scan QR code</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={goArtworkInfo}
        >
        <Text>Go</Text>
        </TouchableOpacity>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:"100%"
    }
})
 
export default ArtworkHome;