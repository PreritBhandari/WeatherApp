import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import Home from "../components/Home";

export default function LocationApp() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [latitude, setlatitude] = useState(null);

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let longitude = location.coords.longitude;
        let latitude = location.coords.latitude;

        setlongitude(longitude);
        setlatitude(latitude);
      })();
    }
  });

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <View style={styles.container}>
      <Home longitude={longitude} latitude={latitude} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
