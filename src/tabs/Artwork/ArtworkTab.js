import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtworkInfo from "./components/ArtworkInfo";
import ArtworkHome from './screens/ArtworkHome';


const ArtworkStack = createStackNavigator();

const ArtworkTab = () => {


  return (
    <ArtworkStack.Navigator>
      <ArtworkStack.Screen  name="ArtworkHome" component={ArtworkHome} />
      <ArtworkStack.Screen name="ArtworkInfo" component={ArtworkInfo} />
    </ArtworkStack.Navigator>

      
  );
};


export default ArtworkTab;
