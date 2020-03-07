import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtworkHome from './screens/ArtworkHome';


const ArtworkStack = createStackNavigator();

const ArtworkTab = () => {


  return (
    <ArtworkHome />
      
  );
};


export default ArtworkTab;
