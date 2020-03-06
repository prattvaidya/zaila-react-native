import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MuseumList from 'zaila/src/tabs/Home/components/Home/MuseumList'
import Header from 'zaila/src/tabs/Home/components/Home/Header'

const Home = ({ navigation }) => {
	// Stores the user's address (street, city, etc.)
	const [address, setAddress] = useState({})

	return (
		<View>
			<Header address={address} setAddress={setAddress} />
			<MuseumList city={address.city} navigation={navigation} />
		</View>
	)
}

export default Home
