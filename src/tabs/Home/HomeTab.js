import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from 'zaila/src/tabs/Home/screens/Home'
import MuseumDetailBasic from './screens/MuseumDetailBasic'
import ExhibitionDetail from './screens/ExhibitionDetail'

const HomeStack = createStackNavigator()

const HomeTab = () => {
	return (
		<HomeStack.Navigator headerMode="none">
			<HomeStack.Screen name="Home" component={Home} />
			<HomeStack.Screen name="MuseumDetail" component={MuseumDetailBasic} />
			<HomeStack.Screen name="ExhibitionDetail" component={ExhibitionDetail} />
		</HomeStack.Navigator>
	)
}

export default HomeTab
