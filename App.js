// React and React Native
import React, { useState } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigator from "zaila/src/tabs/TabNavigator";

// Tab content
import HomeTab from "zaila/src/tabs/Home/HomeTab";
import ArtworkTab from "zaila/src/tabs/Artwork/ArtworkTab";
import ProfileTab from "zaila/src/tabs/Profile/ProfileTab";

// Authentication
import Welcome from "zaila/src/auth/Welcome";

//Camera and Artwork Modal
import ScannerModal from "zaila/src/tabs/Artwork/components/ScannerModal";
import ArtworkInfoModal from "zaila/src/tabs/Artwork/components/ArtworkInfoModal";
import BadgePopup from "zaila/src/shared/BadgePopup";

// Set up the base URL for axios
import { ZAILA_API_URL } from "react-native-dotenv";
import axios from "axios";
axios.defaults.baseURL = ZAILA_API_URL;

const Tab = createBottomTabNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openArtworkModal, setOpenArtworkModal] = useState(false);
  const [sensorId, setSensorId] = useState(null);
  const [openBadgePopup, setOpenBadgePopup] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleArtworkModal = () => {
    setOpenArtworkModal(!openArtworkModal);
  };

  const toggleBadgePopup = () => {
    setOpenBadgePopup(!openBadgePopup);
  };

  return (
    <NavigationContainer>
      {!signedIn ? (
        <Welcome setSignedIn={setSignedIn} />
      ) : (
        <>
          <Tab.Navigator
            initialRouteName="Home"
            tabBar={props => (
              <TabNavigator toggleModal={toggleModal} {...props} />
            )}
          >
            <Tab.Screen name="Home" component={HomeTab} />
            <Tab.Screen name="Artwork" component={ArtworkTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
          </Tab.Navigator>
          <ScannerModal
            setSensorId={setSensorId}
            toggleModal={toggleModal}
            toggleArtworkModal={toggleArtworkModal}
            isOpen={openModal}
          />
          <ArtworkInfoModal
            sensorId={sensorId}
            toggleArtworkModal={toggleArtworkModal}
            isOpenArtworkModal={openArtworkModal}
            toggleBadgePopup={toggleBadgePopup}
          />

          <BadgePopup isOpen={openBadgePopup} toggleModal={toggleBadgePopup} />
        </>
      )}
    </NavigationContainer>
  );
}
