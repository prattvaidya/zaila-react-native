import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchMuseums = () => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchBox}>Search by Museum Name</Text>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  searchBox: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white"
  }
});

export default SearchMuseums;
