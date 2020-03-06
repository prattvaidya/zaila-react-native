import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from 'zaila/src/tabs/Home/screens/Home'
import MuseumDetail from './screens/MuseumDetail'
import ExhibitionDetail from './screens/ExhibitionDetail'

const HomeStack = createStackNavigator()

const HomeTab = () => {
	return (
		<HomeStack.Navigator headerMode="none">
			<HomeStack.Screen name="Home" component={Home} />
			<HomeStack.Screen name="MuseumDetail" component={MuseumDetail} />
			<HomeStack.Screen name="ExhibitionDetail" component={ExhibitionDetail} />
		</HomeStack.Navigator>
	)
}

export default HomeTab
