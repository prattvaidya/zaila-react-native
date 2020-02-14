import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtworkInfo from "zaila/src/tabs/Artwork/components/ArtworkInfo";

const ArtworkStack = createStackNavigator();

const ArtworkTab = () => {

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = ()=>{
        setOpenModal(!openModal);
    }


  return (
    <ArtworkStack.Navigator>
      <ArtworkStack.Screen name="ArtworkInfo" component={ArtworkInfo} />
    </ArtworkStack.Navigator>

        // <View>
        // <ScannerModal toggleModal={toggleModal}  isOpen={openModal}/>
        // <TouchableOpacity
        // onPress={toggleModal}
        // >
        // <Text>Scan QR code</Text>
        // </TouchableOpacity>
        // </View>
  );
};

export default ArtworkTab;
