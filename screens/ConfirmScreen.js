import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConfirmScreen({ route }) {
  const { msg } = route.params;

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
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
});
