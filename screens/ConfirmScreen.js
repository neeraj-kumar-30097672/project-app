import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";
import SuccessCard from "../components/SuccessCard";
import ErrorCard from "../components/ErrorCard";

export default function ConfirmScreen({ route }) {
  const { isRelated } = route.params;
  const message = isRelated
    ? "Message received, Help is on the way"
    : "We could not process your message";

  return (
    <View style={styles.container}>
      {isRelated ? (
        <SuccessCard successMsg={message} />
      ) : (
        <ErrorCard errorMsg={message} />
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
});
