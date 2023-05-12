import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";
import colors from "../utils/colors";
import ErrorCard from "../components/ErrorCard";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely,hourly,daily&units=metric&appid=474da98a7dd7af8382bee6b388b1421d`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => {
          setErrorMsg(error.message);
          setLoading(false);
        });
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && errorMsg.length > 0 && (
        <ErrorCard errorMsg={errorMsg} handlePress={getWeather} />
      )}
      {!loading && errorMsg.length === 0 && (
        <View style={styles.main}>
          <View style={styles.weatherInfo}>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData?.current?.weather[0].icon}@4x.png`,
              }}
            />
            <Text style={styles.textPrimary}>
              {weatherData?.current?.temp} °C
            </Text>
            <Text style={styles.weatherDescription}>
              {weatherData?.current?.weather[0].description}
            </Text>
            <Text style={styles.textSecondary}>
              {weatherData?.current?.weather[0].main}
            </Text>
          </View>
          {weatherData?.alerts ? (
            <View style={styles.alert}>
              <MaterialCommunityIcons
                name="alert"
                size={48}
                color={colors.primary}
              />
              <View>
                <Text>{weatherData?.alerts?.sender_name}</Text>
                <Text>{weatherData?.alerts?.event}</Text>
                <Text>{weatherData?.alerts?.description}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.alert}>
              <AntDesign name="Safety" size={48} color={colors.primary} />
              <Text>No alerts as of now in your area.</Text>
            </View>
          )}
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
              <View style={styles.weatherDetailsBox}>
                <FontAwesome5
                  name="temperature-low"
                  size={25}
                  color={colors.primary}
                />
                <View style={styles.weatherDetailsItems}>
                  <Text>Feels like :</Text>
                  <Text style={styles.textSecondary}>
                    {weatherData?.current?.feels_like} °C
                  </Text>
                </View>
              </View>
              <View style={styles.weatherDetailsBox}>
                <MaterialCommunityIcons
                  name="water"
                  size={30}
                  color={colors.primary}
                />
                <View style={styles.weatherDetailsItems}>
                  <Text>Humidity :</Text>
                  <Text style={styles.textSecondary}>
                    {weatherData?.current?.humidity} %
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.weatherDetailsRow}>
              <View style={styles.weatherDetailsBox}>
                <MaterialCommunityIcons
                  name="weather-windy"
                  size={30}
                  color={colors.primary}
                />
                <View style={styles.weatherDetailsItems}>
                  <Text>Wind Speed :</Text>
                  <Text style={styles.textSecondary}>
                    {weatherData?.current?.wind_speed} Km/H
                  </Text>
                </View>
              </View>
              <View style={styles.weatherDetailsBox}>
                <MaterialCommunityIcons
                  name="speedometer"
                  size={30}
                  color={colors.primary}
                />
                <View style={styles.weatherDetailsItems}>
                  <Text>Pressure :</Text>
                  <Text style={styles.textSecondary}>
                    {weatherData?.current?.pressure} hPa
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  textPrimary: {
    fontSize: 40,
    color: colors.primary,
  },
  textSecondary: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "500",
  },
  weatherDetailsRow: {
    flexDirection: "row",
  },
  weatherDetailsBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.black,
    width: 170,
    height: 80,
    margin: 10,
    padding: 10,
  },
  weatherDetailsItems: {
    marginLeft: 10,
  },
  alert: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    columnGap: 15,
  },
});
