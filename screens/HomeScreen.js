import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import ErrorCard from "../components/ErrorCard";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

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

  const handleSubmit = () => {
    if (!location) {
      getLocation();
    }

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

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && errorMsg.length > 0 && (
        <ErrorCard errorMsg={errorMsg} handlePress={getLocation} />
      )}
      {!loading && errorMsg.length === 0 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Type Emergency Message Here..."
            value={text}
            numberOfLines={6}
            onChangeText={(input) => setText(input)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.btnText}>Send</Text>
            <MaterialCommunityIcons
              name="send-circle"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </>
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
  input: {
    width: "85%",
    margin: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    color: colors.black,
    padding: 10,
    width: "85%",
    borderRadius: 10,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 22,
    marginRight: 10,
  },
});
