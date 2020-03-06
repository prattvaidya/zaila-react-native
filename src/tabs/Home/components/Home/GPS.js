import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const GPS = ({ address, setAddress }) => {
  // Determines if GPS permission is granted
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);

  // Stores the user's location (GPS coordinates) and address (street, city, etc.)
  const [location, setLocation] = useState("Tracking you down..");

  // Hook to execute code on every render
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Wait for changes to the location to get the name of the city
  useEffect(() => {
    const getAddress = async () => {
      const res = await Location.reverseGeocodeAsync(location.coords);
      setAddress(res[0]);
    };
    if (location.coords) {
      getAddress();
    }
  }, [location]);

  // Check if permission is granted
  const checkLocationPermission = async () => {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    if (status === "granted") {
      setIsGPSEnabled(true);
      getLocation();
    } else {
      getPermission();
    }
  };

  // Get permission for accessing the location. Triggered after the user taps the Button for sharing location
  const getPermission = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === "granted") {
      setIsGPSEnabled(true);
      getLocation();
    } else {
      throw new Error("Location permission not granted");
    }
  };

  //Get the user's current location
  const getLocation = async () => {
    setLocation(
      await Location.getCurrentPositionAsync() // Optionally pass { enableHighAccuracy: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Display the button to request GPS if we don't have the permission */}
      {isGPSEnabled && (
        <View>
          {/* Fetching location is async. Need to display a placeholder through this condition until it's fetched */}
          {location.coords ? (
            <View style={styles.locationInfo}>
              <Text style={styles.location}>
                {address.city}, {address.region}
              </Text>
            </View>
          ) : (
            // Placeholder value until the real location coordinates are fetched
            <Text>{location}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  btn: {
    alignSelf: "stretch"
  },
  locationInfo: {
    alignItems: "center"
  },
  location: {
    color: "white"
  }
});

export default GPS;
