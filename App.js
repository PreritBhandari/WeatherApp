import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import LocationApp from "./components/location";

export default function App() {
  return (
    <View style={styles.container}>
      <LocationApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009fca",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
