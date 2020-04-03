// React, React Native and Expo
import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as SecureStore from 'expo-secure-store'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigator from 'zaila/src/tabs/TabNavigator'

// Tab content
import HomeTab from 'zaila/src/tabs/Home/HomeTab'
import ArtworkTab from 'zaila/src/tabs/Artwork/ArtworkTab'
import ProfileTab from 'zaila/src/tabs/Profile/ProfileTab'

// Authentication
import Welcome from 'zaila/src/auth/Welcome'

//Camera and Artwork Modal
import ScannerModal from 'zaila/src/tabs/Artwork/components/ScannerModal'
import ArtworkInfoModal from 'zaila/src/tabs/Artwork/components/ArtworkInfoModal'
import BadgePopup from 'zaila/src/shared/BadgePopup'

// Set up the base URL for axios
import { ZAILA_API_URL } from 'react-native-dotenv'
import axios from 'axios'
axios.defaults.baseURL = ZAILA_API_URL

// Suppress warnings
console.disableYellowBox = true

const Tab = createBottomTabNavigator()

export default function App() {
	const [signedIn, setSignedIn] = useState(undefined)
	const [openModal, setOpenModal] = useState(false)
	const [openArtworkModal, setOpenArtworkModal] = useState(false)
	const [sensorId, setSensorId] = useState(null)
	const [openBadgePopup, setOpenBadgePopup] = useState(false)

	// Check if the user is logged in
	SecureStore.getItemAsync('id_token').then(value => {
		//console.log('Token', value)
		value ? setSignedIn(true) : setSignedIn(false)
	})

	const toggleModal = () => {
		setOpenModal(!openModal)
	}

	const toggleArtworkModal = () => {
		setOpenArtworkModal(!openArtworkModal)
	}

	const toggleBadgePopup = () => {
		setOpenBadgePopup(!openBadgePopup)
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<NavigationContainer>
				{signedIn === false && <Welcome setSignedIn={setSignedIn} />}
				{signedIn === true && (
					<>
						<Tab.Navigator
							initialRouteName="Home"
							tabBar={props => <TabNavigator toggleModal={toggleModal} {...props} />}
						>
							<Tab.Screen name="Home" component={HomeTab} />
							<Tab.Screen name="Artwork" component={ArtworkTab} />
							<Tab.Screen name="Profile" component={ProfileTab} initialParams={{ setSignedIn: setSignedIn }} />
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
		</TouchableWithoutFeedback>
	)
}
