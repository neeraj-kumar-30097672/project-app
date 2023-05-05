import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import colors from "../utils/colors";
import SuccessCard from "../components/SuccessCard";
import ErrorCard from "../components/ErrorCard";

export default function ConfirmScreen({ route }) {
  const { isRelated, id } = route.params;
  const message = isRelated
    ? "We have sent your request to a concerned authority. You will receive help soon."
    : "We could not process your message";

  return (
    <View style={styles.container}>
      {!isRelated ? (
        <View>
          <SuccessCard successMsg={message} requestId={id} />
          <TouchableOpacity
            style={styles.call}
            onPress={() => Linking.openURL("tel:112")}
          >
            <Text style={styles.callText}>
              If there is a delay in help, Click to Call
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <ErrorCard errorMsg={message} />
          <TouchableOpacity
            style={styles.call}
            onPress={() => Linking.openURL("tel:112")}
          >
            <Text style={styles.callText}>
              If this is a mistake, Click to Call
            </Text>
          </TouchableOpacity>
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
  call: {
    backgroundColor: colors.primary,
    height: 60,
    justifyContent: "center",
    marginBottom: 80,
    borderRadius: 10,
  },
  callText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
