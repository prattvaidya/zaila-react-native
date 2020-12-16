// React and React Native
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Google from "expo-google-app-auth";
import {
  ZAILA_IOS_CLIENT_ID,
  ZAILA_ANDROID_CLIENT_ID,
} from "react-native-dotenv";

// Images
import ZailaTextLogo from "zaila/assets/img/zaila-text.png";
import Zaila from "zaila/assets/img/zaila.png";

// Global Styles
import { colors } from "zaila/styles/global";

// Core components
import ZailaText from "zaila/src/core/ZailaText";
import ZailaButton from "zaila/src/core/ZailaButton";

// Components
import Login from "zaila/src/auth/components/Login";
import EmailLogin from "zaila/src/auth/components/EmailLogin";
import SignUp from "zaila/src/auth/components/SignUp";

import { post } from "zaila/src/services/zaila-api.js";

const Welcome = ({ setSignedIn }) => {
  const [selection, setSelection] = useState("welcome");

  let config = {
    iosClientId: ZAILA_IOS_CLIENT_ID,
    androidClientId: ZAILA_ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
  };

  const authenticate = (token) => {
    if (token) SecureStore.setItemAsync("id_token", token);
    setSignedIn(true);
  };

  const handleGoogleLogin = async () => {
    // Handle exception if user hits cancel while logging in with Google
    try {
      const { type, idToken } = await Google.logInAsync(config);
      // console.log(type, idToken, user)

      if (type === "success") {
        // Try to login the user
        post("auth/login", {}, idToken)
          .then((res) => {
            // Returning user. Login successful
            authenticate(res.token);
          })
          .catch((err) => {
            // Sign up if the user's account doesn't exist
            return post("auth/registerUser", {}, idToken);
          })
          .then((res) => {
            if (!res.errorCode && res.userId) {
              // Sign in the user
              return post("auth/login", {}, idToken);
            }
          })
          .then((res) => {
            authenticate(res.token);
          });
      }
    } catch (e) {
      // User cancelled Google Login
      console.log("Google login cancelled", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ZailaTextLogo} />

      {/* Display initially: Zaila's image, Login and Signup buttons */}
      {selection === "welcome" && (
        <>
          <Image source={Zaila} style={styles.zaila} />
          <View styles={styles.btnContainer}>
            <ZailaButton onPress={handleGoogleLogin} type="google">
              Login
            </ZailaButton>
            {/* <ZailaButton onPress={() => setSelection("login")}>
              Login
            </ZailaButton>
            <ZailaButton onPress={() => setSelection("signup")}>
              Signup
            </ZailaButton> */}
          </View>
        </>
      )}

      {/* Displayed when the Login button is pressed */}
      {selection === "login" && (
        <Login
          onSuccess={authenticate}
          selection={selection}
          onSelectionChange={setSelection}
        />
      )}

      {/* Displayed when the Email Login method is selected */}
      {selection === "emailLogin" && <EmailLogin onSuccess={authenticate} />}

      {/* Displayed when the Signup button is pressed */}
      {selection === "signup" && <SignUp onSuccess={authenticate} />}

      {/* Display the back button on Login, Email Login and Signup screens */}
      {(selection === "login" ||
        selection === "signup" ||
        selection === "emailLogin") && (
        <ZailaButton onPress={handleGoogleLogin} type="google">
          Login with Google
        </ZailaButton>
        // <ZailaButton
        //   style={styles.backBtn}
        //   onPress={() =>
        //     setSelection(selection === "emailLogin" ? "login" : "welcome")
        //   }
        // >
        //   Back
        // </ZailaButton>
      )}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  zaila: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  backBtn: {
    width: "70%",
  },
});
