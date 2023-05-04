import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

export default function ErrorCard({ errorMsg, handlePress }) {
  return (
    <View style={styles.card}>
      <MaterialIcons name="error" size={250} color={colors.primary} />
      <Text style={styles.text}>{errorMsg}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.btnText}>TRY AGAIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "50%",
    borderRadius: 10,
    marginVertical: 40,
  },
  btnText: {
    fontWeight: "900",
    fontSize: 20,
    color: colors.white,
  },
});
