import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const params = new URLSearchParams({
      msg: text,
      lat: location.latitude,
      long: location.longitude,
    });

    const url = `http://192.168.43.33:3000/api?${params.toString()}`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <TextInput
            style={styles.input}
            value={text}
            numberOfLines={4}
            onChangeText={(input) => setText(input)}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </>
      ) : (
        <>
          <Text>{errorMsg}</Text>
          <Button title="Try Again" onPress={getLocation} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
