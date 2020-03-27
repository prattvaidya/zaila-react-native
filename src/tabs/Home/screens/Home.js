import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MuseumList from 'zaila/src/tabs/Home/components/Home/MuseumListBasic'
import Header from 'zaila/src/tabs/Home/components/Home/Header'

const Home = ({ navigation }) => {
	// Stores the user's address (street, city, etc.)
	const [address, setAddress] = useState({})
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<View>
			<Header address={address} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setAddress={setAddress} />
			<MuseumList city={address.city} navigation={navigation} searchQuery={searchQuery} />
		</View>
	)
}

export default Home
