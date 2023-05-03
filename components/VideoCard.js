import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoCard({ video }) {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.card}>
      <YoutubePlayer height={210} play={play} videoId={video.vid} />
      <Button title={play ? "Pause" : "Play"} onPress={() => setPlay(!play)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
