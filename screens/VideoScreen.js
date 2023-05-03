import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import data from "../utils/video-data";
import VideoCard from "../components/VideoCard";

export default function VideoScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.vid}
      />
    </SafeAreaView>
  );
}
