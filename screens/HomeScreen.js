import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    getLocation();
    setLoading(true);

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
        navigation.navigate("Status", data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
    setText("");
    setLoading(false);
  };

  const getLocation = async () => {
    try {
      setErrorMsg("");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && errorMsg.length > 0 && (
        <>
          <Text>{errorMsg}</Text>
          <Button title="Try Again" onPress={getLocation} />
        </>
      )}
      {!loading && errorMsg.length === 0 && (
        <>
          <TextInput
            style={styles.input}
            value={text}
            numberOfLines={4}
            onChangeText={(input) => setText(input)}
          />
          <Button onPress={handleSubmit} title="Submit" />
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
