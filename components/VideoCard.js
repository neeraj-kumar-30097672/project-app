import React, { useEffect, useState } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

export default function VideoCard({ video }) {
  const [play, setPlay] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    url: "/",
  });

  const getThumbnail = () => {
    if (details.url.length > 0) {
      return <Image source={{ uri: details.url }} height={210} />;
    } else {
      return (
        <View style={styles.thumbnail}>
          <MaterialCommunityIcons
            name="reload-alert"
            size={24}
            color={colors.black}
          />
          <Text style={{ fontWeight: "bold" }}>{details.title}</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    getYoutubeMeta(video.vid).then((meta) => {
      setDetails({
        title: meta.title,
        url: meta.thumbnail_url,
      });
    });
  }, []);

  return (
    <View style={styles.card}>
      {play ? (
        <YoutubePlayer height={210} play={play} videoId={video.vid} />
      ) : (
        getThumbnail()
      )}
      <Button
        title={play ? "Pause" : "Play"}
        onPress={() => setPlay(!play)}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  thumbnail: {
    height: 210,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    color: colors.black,
    padding: 20,
  },
});
