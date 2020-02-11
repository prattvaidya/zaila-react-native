import React ,{useState} from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import ScannerModal from './screens/ScannerModal';

const ArtworkTab = () => {

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = ()=>{
        setOpenModal(!openModal);
        console.log(openModal);
    }

    return ( 
        <View>
            <ScannerModal toggleModal={toggleModal}  isOpen={openModal}/>
            <TouchableOpacity
            onPress={toggleModal}
            >
            <Text>Scan QR code</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default ArtworkTab;