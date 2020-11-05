import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

import { List, ListItem } from "native-base";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],

      latitude: this.props.latitude,
      longitude: this.props.longitude,
    };
  }

  async componentDidMount() {
    console.log(this.state.longitude, this.state.latitude);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=a961c22b7e8b37089c9f5462417192c7`
    );
    const responseJson = await response.json();
    this.setState({
      weather: responseJson,

      name: responseJson.name,
      country: responseJson.sys.country,
      conditionBrief: responseJson.weather[0].main,
      icon:
        "http://openweathermap.org/img/w/" +
        responseJson.weather[0].icon +
        ".png",
      temp: responseJson.main.temp,
      sunrise: responseJson.sys.sunrise,
      sunset: responseJson.sys.sunset,
      humidity: responseJson.main.humidity,
      pressure: responseJson.main.pressure,
      sealevel: responseJson.main.sea_level,
      feelslike: responseJson.main.feels_like,
    });
    console.log(this.state.weather);
  }

  render() {
    const {
      weather,
      name,
      country,
      conditionBrief,
      temp,
      sunrise,
      sunset,
      icon,
      humidity,
      pressure,
      sealevel,
      feelslike,
    } = this.state;

    const sunrise_date = new Date(sunrise * 1000);
    const rise_hours = sunrise_date.getHours();
    const rise_minutes = sunrise_date.getMinutes();

    const sunset_date = new Date(sunset * 1000);
    const set_hours = sunset_date.getHours();
    const set_minutes = sunset_date.getMinutes();

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Lat : {this.props.latitude}</Text>
          <Text style={{ color: "white" }}>Long : {this.props.longitude}</Text>
        </View>

        <View
          style={{
            marginTop: "15%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ height: 100, width: 100 }} source={{ uri: icon }} />
          <Text style={{ fontSize: 35, color: "#fff" }}>
            {name} &nbsp;
            <Text style={{ fontSize: 15, color: "#fff" }}>{country}</Text>
          </Text>
          <Text style={{ fontSize: 20, color: "#fff" }}>{conditionBrief}</Text>
          <Text style={{ fontSize: 100, fontWeight: "200", color: "#fff" }}>
            {Math.round(temp - 273)}&deg;
          </Text>
          <ScrollView
            style={{
              marginTop: "20%",
            }}
            showsVerticalScrollIndicator="false"
          >
            <List>
              <ListItem>
                <View>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../assets/rise.png")}
                  />
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "200",
                      color: "#fff",
                      marginTop: "10%",
                    }}
                  >
                    {Math.abs(12 - rise_hours)}:{rise_minutes} AM{" "}
                    {"           "}{" "}
                    <Text style={{ fontWeight: "400" }}>SUNRISE</Text>
                  </Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <Image
                    style={{ width: 90, height: 90 }}
                    source={require("../assets/set.png")}
                  />
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "200",
                      color: "#fff",
                    }}
                  >
                    {Math.abs(12 - set_hours)}:{set_minutes} PM {"            "}{" "}
                    <Text style={{ fontWeight: "400" }}>SUNSET</Text>
                  </Text>
                </View>
              </ListItem>
              <ListItem>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "silver",
                  }}
                >
                  HUMIDITY {"                    "}PRESSURE{"\n"}
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "400",
                      color: "white",
                    }}
                  >
                    {humidity} %{"             "}
                    {pressure} hPa
                  </Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "silver",
                  }}
                >
                  SEALEVEL {"                    "}FEELS LIKE{"\n"}
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "400",
                      color: "white",
                    }}
                  >
                    {sealevel}
                    {"               "}
                    {Math.round(feelslike - 273)}&deg;
                    {"\n"}
                  </Text>
                </Text>
              </ListItem>
            </List>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
