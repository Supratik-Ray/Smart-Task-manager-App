import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingState() {
  return (
    <View className="flex-1 justify-center items-center py-20">
      <ActivityIndicator size="large" color="white" />
      <Text className="mt-4 text-text-secondary">Loading tasks...</Text>
    </View>
  );
}
