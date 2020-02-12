import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center"
  },
  widget: {
    backgroundColor: "hotpink",
    position: "absolute",
    bottom: 40,
    right: 0,
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

// Replaced the images with icon.png since the old images aren't present inside the assets folder
export const images = {
  ratings: {
    "1": require("../assets/icon.png"),
    "2": require("../assets/icon.png"),
    "3": require("../assets/icon.png"),
    "4": require("../assets/icon.png"),
    "5": require("../assets/icon.png")
  }
};
