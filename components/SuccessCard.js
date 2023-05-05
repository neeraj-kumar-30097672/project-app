import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

export default function SuccessCard({ successMsg, requestId }) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name="check-decagram"
        size={250}
        color={colors.primary}
      />
      <Text>Request Id: {requestId}</Text>
      <Text style={styles.text}>{successMsg}</Text>
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
