import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtworkHome from './screens/ArtworkHome';


const ArtworkStack = createStackNavigator();

const ArtworkTab = () => {


  return (
    <ArtworkStack.Navigator>
      <ArtworkStack.Screen  name="ArtworkHome" component={ArtworkHome} />
    </ArtworkStack.Navigator>

      
  );
};


export default ArtworkTab;
