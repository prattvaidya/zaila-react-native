import React from "react";

const Location = () => {
  // Determines if GPS permission is granted
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);

  // Stores the user's location
  const [location, setLocation] = useState("Tracking you down..");

  // Stores the name of the museum where the user is (<= .3 kms)
  const [museum, setMuseum] = useState("");

  // List of all museums
  const museums = [
    { name: "Langara", lat: "49.223952", lng: "-123.107875" },
    { name: "Sunset", lat: "49.222833", lng: "-123.101085" },
    { name: "Superstore", lat: "49.208989", lng: "-123.099623" }
  ];

  // Hook to execute code on every render
  useEffect(() => {
    checkLocationPermission();
  }, []);

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
      await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    );
  };

  //Determine if the user is in a museum at the moment
  // This logic needs discussion
  const findNearbyMuseum = () => {
    museums.forEach(({ name, lat: museumLat, lng: museumLng }) => {
      // User's location
      const { latitude: userLat, longitude: userLng } = location.coords;

      // Formula is SqRoot((X1-X2)^2 + (Y1-Y2)^2)
      const distance =
        Math.sqrt(
          Math.pow(parseFloat(museumLat) - parseFloat(userLat), 2) +
            Math.pow(parseFloat(museumLng) - parseFloat(userLng), 2)
        ) * 100;
      // The result is a fraction. Gotta multiply by 100 to convert it to human-friendly KM units

      // If it's closer than .3 KMs, then it's pretty close enough for the user to be inside it.
      if (distance <= 0.3) setMuseum(name);
    });
  };
  return (
    <View style={globalStyles.container}>
      {/* Display the button to request GPS if we don't have the permission */}
      {isGPSEnabled && (
        <View>
          {/* Fetching location is async. Need to display a placeholder through this condition until it's fetched */}
          {location.coords ? (
            <View style={styles.locationInfo}>
              <Text>Lat: {location.coords.latitude}</Text>
              <Text>Lng: {location.coords.longitude}</Text>
              <Text>Accuracy: {location.coords.accuracy}</Text>
              {/* Either display the museum's name or the button to find the nearest museum */}
              {/* {museum == "" ? (
                <Button
                  title="Find Museum"
                  onPress={findNearbyMuseum}
                  style={styles.btn}
                />
              ) : (
                <Text>Museum: {museum}</Text>
              )} */}
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

export default Location;
